const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state= {}
    showTextNode(1)

}
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', ()=> selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}
function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}
function selectOption(option){
    const nextTextNodeId = option.nextText

    if(nextTextNodeId <=0){
        return startGame()
    }

    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

}

const textNodes = [
    {
        id:1,
        text:'You wake up in the middle of code ninjas and noticed a jar of green glowing goo.',
        options:[
            {
                text: 'The floor is comfy, go back to bed',
                nextText:12
            },
            {
                text:'Pick up the goo',
                setState: {greenGoo: true},
                nextText:2
            },
            {
                text:'Leave the goo ',
                nextText:2
            },
            {
                text:'Immediately chug the entire glass of goo',
                nextText:13
            }
        ]
    },
    {
        id:2,
        text:'You leave Code Ninjas and are transported to thick forest at dusk. In the glow of the setting sun, you see a merchant.',
        options: [
            {
                text:'Trade the goo for a sword',
                requiredState:(currentState) => currentState.greenGoo,
                setState: {greenGoo:false, sword:true},
                nextText: 3
            },
            {
                text:'Trade the goo for a sheild',
                requiredState:(currentState) => currentState.greenGoo,
                setState: {greenGoo:false, sheild:true},
                nextText: 3
            },
            {
                text:'Ignore the merchant',
                nextText: 3
            },

        ]
    },
    {
        id:3,
        text:'You push past the merchants store and into "Kylie Land", it has houses, farms, and stores surrounding a gigantic castle in the center of the kingdom.',
        options: [
            {
                text:'You venture into the large castle doors',
                nextText:4
            },
            {
                text:'You get some rest at the closest hotel',
                nextText:5
            },
            {
                text:'You fall asleep from exhaustion in a pile of horses hay',
                nextText:6
            }
        ]
    },
    {
        id:4,
        text:'Youre so tired from exploring you fall asleep in the castle and are killed by an ogre while dreaming of javascript',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id:5,
        text:'You have no money, so you try to break in and get thrown in jail for 99999 years becuase of your brokeness',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [
            {
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack it with your sword',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind your shield',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Throw the green goo at it',
                requiredState: (currentState) => currentState.greenGoo,
                nextText: 11
            }
        ]
  },
  {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [
            {
                text: 'You Dead:( Restart',
                nextText: -1
            }
        ]
  },
  {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
            {
                text: 'You Dead:( Restart',
                nextText: -1
            }
        ]
  },
  {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
  },
  {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as yours and live out the rest of your days there. You name the kingdom "Radoiactive Chicken Land"',
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
  },
  {
    id:12,
    text:'You get woken up by Kylies Web Development class, today youre making a text adventure game',
    options: [
        {
            text: 'Restart',
            nextText: -1
        }
    ]
    },
    {
        id:13,
        text:'Youre not very smart are you? You burst in to green flames and get teleported to a school youre stuck inside with a million Zachary and Zihan clones forever.',
        options: [
            {
                text: 'End the Suffering, Restart',
                nextText: -1
            }
        ]
        },


]
startGame()