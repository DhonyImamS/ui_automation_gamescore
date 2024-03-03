import { Selector } from 'testcafe';

let hashMapElement = {};

async function scanning(testcafeSelector) {
    // scanning element
    const elementBox = testcafeSelector('div[style="opacity: 1;"]');
    const countElementBox = await elementBox.count;

    for (let index = 0; index < countElementBox; index++) {
        const element = elementBox.nth(index);
        const text = await element.textContent;
        hashMapElement[text] = index;
    }
}

async function shiftingHashMapIndex(originalHashMap, deletedIndex) {
    let newHashMap = {};
    for (let key in originalHashMap) {
        let value = originalHashMap[key];
        if (value > deletedIndex) {
            value = value - 1;
        }
        newHashMap[key] = value;
    }
    return newHashMap;
}

fixture `UI Automation Test - Score`
    .page `https://zzzscore.com/1to50/en/#`;

    test.skip('My first test with object scanning O(n)', async t => {
        let decreaseCounter = 1;
    
        // Maximize the browser window
        await t.maximizeWindow();
    
        await scanning(Selector);
    
        // action from 1 to 25
        for (let textData = 1; textData <= 50; textData++) {
            let index = hashMapElement[textData];
    
            let element = Selector(`div[style="opacity: 1;"]`).nth(index);
    
            await t.click(element).wait(1000);
            
            hashMapElement = {};
            await scanning(Selector);
        } 
    
    });

    test('My first test', async t => {
        let decreaseCounter = 1;
        let countElementBox = 25

        // Maximize the browser window
        await t.maximizeWindow();

        await scanning(Selector);

        // action from 1 to 25
        for (let textData = 1; textData <= 50; textData++) {
            let index = hashMapElement[textData];

            let element = Selector(`div[style="opacity: 1;"]`).nth(index);

            await t.click(element).wait(150);

            // recalculate length element
            const elementBox = Selector('div[style="opacity: 1;"]');
            countElementBox = await elementBox.count;

            // replace value in hashMapElement by refetch value
            if (countElementBox === 25) {
                delete hashMapElement[textData];

                element = Selector(`div[style="opacity: 1;"]`).nth(index)
                const updateText = await element.textContent;
                hashMapElement[updateText] = index  
            } else if (countElementBox < 25 ) {
                hashMapElement = await shiftingHashMapIndex(hashMapElement, index);
            }
            
        } 

        // to see closing statement result
        await t.wait(1000);

});