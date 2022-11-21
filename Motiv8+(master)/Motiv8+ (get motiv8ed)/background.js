var motiv8ionNotification = 'One Minute Motiv8ion';
browser.alarms.create('', { periodInMinutes: 1});
function getRandom() {
    var quotes = [
        'Stay Hungry. Stay Foolish. - Steve Jobs',
        'The road to success and the road to failure are almost exactly the same. — Colin R. Davis',
        'Be yourself; everyone else is already taken. - Oscar Wilde',
        'Simplicity is the ultimate sophistication. - Leonardo Da Vinci',
        'I never dreamed about success. I worked for it. - Estée Lauder',
        'In real open source, you have the right to control your own destiny - Linus Torvalds',
        'When you change your thoughts, remember to also change your world. - Norman Vincent Peale',
        'Success is something you attract by the person you become. - Jim Rohn',
        'Why fit in when you were born to stand out? - Dr. Seuss',
        'You are the average of the five people you spend the most time with. - Jim Rohn',
        'Success is not final; failure is not fatal: It is the courage to continue that counts. — Winston S. Churchill',
        'You can change what you are and where you are by changing what goes into your mind. - Zig Ziglar',
        'I think it is possible for ordinary people to choose to be extraordinary. - Elon Musk',
        'Don’t let yesterday take up too much of today. — Will Rogers',
        'Success is getting what you want, happiness is wanting what you get. ―W. P. Kinsella',
        'Experience is a hard teacher because she gives the test first, the lesson afterwards. ―Vernon Sanders Law',
        'Success usually comes to those who are too busy looking for it. — Henry David Thoreau',
        'Before software can be reusable it first has to be usable. - Ralph Johnson',
        'Without requirements or design, programming is the art of adding bugs to an empty text file. - Louis Srygley',
        'Java is to JavaScript what Car is to Carpet. - Chris Heilmann'
    ];
return quotes[Math.floor(Math.random() * Math.floor(quotes.length))];
}
browser.alarms.onAlarm.addListener(function (alarm) {
    browser.notifications.create(motiv8ionNotification, {
        type: 'basic',
        iconUrl: browser.extension.getURL('icons/mv8-48.png'),
        title: 'One Minute Motiv8ion',
        message: getRandom()
    });
});
browser.browserAction.onClicked.addListener(() => {
    var clearing = browser.notifications.clear(motiv8ionNotification);
    clearing.then(() => {
        console.log('cleared');
    });
});