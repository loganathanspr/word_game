export const SUPPORTED_UI_LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' }
];

export const translations: Record<string, Record<string, string>> = {
    en: {
        appTitle: 'Shabd Paheli',
        appSubtitle: 'The Indian Word Puzzle',
        selectGameLanguageLabel: 'Select a language',
        startGameButton: 'Start Game',
        endScreenMessageExcellent: 'Excellent!',
        endScreenMessageGood: 'Great Job!',
        endScreenMessageNice: 'Nice Try!',
        endScreenFinished: 'You have finished the game!',
        playAgainButton: 'Play Again',
        roundLabel: 'Round:',
        scoreLabel: 'Score:',
        imageLoading: 'Loading image...',
        doesWordMatchImage: 'Does this word match the image?',
        yesButton: 'Yes',
        noButton: 'No',
        errorCouldNotStart: 'Could not start the game. The model might be busy. Please try again in a moment.',
        loaderCreatingGame: 'Building your game... please wait',
        uiLanguageLabel: 'Language',
    },
    ta: {
        appTitle: 'சொல் புதிர்',
        appSubtitle: 'இந்திய வார்த்தை விளையாட்டு',
        selectGameLanguageLabel: 'மொழியைத் தேர்ந்தெடுக்கவும்',
        startGameButton: 'விளையாட்டைத் தொடங்கு',
        endScreenMessageExcellent: 'அற்புதம்!',
        endScreenMessageGood: 'சிறந்த முயற்சி!',
        endScreenMessageNice: 'நல்ல முயற்சி!',
        endScreenFinished: 'நீங்கள் விளையாட்டை முடித்துவிட்டீர்கள்!',
        playAgainButton: 'மீண்டும் விளையாடு',
        roundLabel: 'சுற்று:',
        scoreLabel: 'மதிப்பெண்:',
        imageLoading: 'படம் ஏற்றப்படுகிறது...',
        doesWordMatchImage: 'இந்த வார்த்தை படத்துடன் பொருந்துகிறதா?',
        yesButton: 'ஆம்',
        noButton: 'இல்லை',
        errorCouldNotStart: 'விளையாட்டைத் தொடங்க முடியவில்லை. மாடல் பிஸியாக இருக்கலாம். சிறிது நேரத்தில் மீண்டும் முயற்சிக்கவும்.',
        loaderCreatingGame: 'உங்கள் விளையாட்டு உருவாக்கப்படுகிறது... காத்திருக்கவும்',
        uiLanguageLabel: 'மொழி',
    }
};