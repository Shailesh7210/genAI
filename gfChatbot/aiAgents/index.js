import readlineSync from 'readline-sync'



const History = [];


function sum (num1,num2){
    return num1 + num2
}

function prime(num){
    if(num<2) return false
    for(let i=2; i<=Math.sqrt(num); i++){
        if(num%i==0) return false
    }
    return true
}

async function getCryptoPrice(coin){
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=&{coin}&x_cg_demo_api_key=CG-S5JmNdMumkBZDsMaQkMnwrCH`)
    const data = await response.json()
    return data
}

const sumDeclaration = {
    name: 'sum',
    description: "Get the sum of two numbers",
    parameters:{
        type: Object,
        properties:{
            num1:{
                type:'Number',
                description: 'it will be first number for addition ex: 10'
            },
            num2:{
                type:'Number',
                description: 'it will be second number for addition ex: 10'
            }
        },
        required: ['num1','num2']

    }
}

const primeDeclaration = {
    name: 'prime',
    description: 'get if number is prime or not',
    parameters:{
        type:'object',
        properties:{
            num:{
                type: 'number',
                description:'it will be the number to find it is prime or not ex:10'
            }
        },
        required:[num]
    }
}

const cryptoDeclaration ={
    name: 'getCryptoPrice',
    description:'get the current price of any cryptocurrency like bitcoin',
    parameters:{
        type:'object',
        properties:{
            coin:{
                type:'String',
                description:'it will be the crypto currency name like bitcoin'
            }

        },
        required:[coin]
    }
}

async function runAgent(userProblem){

    History.push({
        role: 'user',
        parts:[{text:userProblem}]
    })


    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        content: History,
        config: {
            tools: [{
                functionDeclaration: [sumDeclaration,primeDeclaration,cryptoDeclaration]
            }]
        }
    })
}

async function main(){
    const userProblem = readlineSync.question("Type your question here")
    await runAgent(userProblem)
    main()
}

main()