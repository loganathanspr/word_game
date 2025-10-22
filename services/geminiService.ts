
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { GameRound, GameWord } from '../types';
import { TOTAL_ROUNDS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const generateWordData = async (language: string): Promise<GameWord[]> => {
  const prompt = `Generate an array of ${TOTAL_ROUNDS} JSON objects for a language learning game. The target language is ${language}.
  For each object in the array, provide:
  1. "objectName": A common, simple, visually distinct object (e.g., 'apple', 'car', 'book'). Ensure all object names in the array are unique.
  2. "word": The translation of the object's name in ${language} in its native script.
  3. "wordEnglish": The phonetical representation of the word in English.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            objectName: { type: Type.STRING },
            word: { type: Type.STRING },
            wordEnglish: { type: Type.STRING },
          },
          required: ["objectName", "word", "wordEnglish"],
        },
      },
    },
  });

  const jsonString = response.text.trim();
  return JSON.parse(jsonString);
};

const generateImage = async (objectName: string): Promise<string> => {
  const prompt = `A high-quality, clear, colorful photograph of a single ${objectName} on a plain white background.`;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
  }

  throw new Error(`Could not generate image for ${objectName}`);
};

const createIncorrectPairs = (rounds: GameRound[]): GameRound[] => {
    const totalRounds = rounds.length;
    const numIncorrect = Math.floor(totalRounds / 2); // Make about half the rounds incorrect
    const incorrectIndices = new Set<number>();
  
    while (incorrectIndices.size < numIncorrect) {
      incorrectIndices.add(Math.floor(Math.random() * totalRounds));
    }
  
    return rounds.map((round, index) => {
      if (incorrectIndices.has(index)) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * totalRounds);
        } while (randomIndex === index); // Ensure we don't pick the same word
  
        return {
          ...round,
          word: rounds[randomIndex].word,
          wordEnglish: rounds[randomIndex].wordEnglish,
          isCorrect: false,
        };
      }
      return { ...round, isCorrect: true };
    });
  };
  

export const prepareGameSession = async (language: string): Promise<GameRound[]> => {
  const wordData = await generateWordData(language);

  const gameRoundsWithImages: (Omit<GameRound, 'isCorrect'> | null)[] = await Promise.all(
    wordData.map(async (word) => {
      try {
        const imageUrl = await generateImage(word.objectName);
        return { ...word, imageUrl };
      } catch (error) {
        console.error(`Failed to generate image for ${word.objectName}:`, error);
        return null;
      }
    })
  );

  const validGameRounds = gameRoundsWithImages.filter(round => round !== null) as GameRound[];

  if (validGameRounds.length < TOTAL_ROUNDS) {
    throw new Error("Could not generate enough game rounds.");
  }
  
  const finalRounds = createIncorrectPairs(validGameRounds);

  // Fisher-Yates shuffle to randomize the order of questions
  for (let i = finalRounds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalRounds[i], finalRounds[j]] = [finalRounds[j], finalRounds[i]];
  }

  return finalRounds;
};
