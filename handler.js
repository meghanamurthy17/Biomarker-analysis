const blockChain=require('./BuildBlock')
const CILCoin=new blockChain()

//adding data into each blocks and then add them to the chain
CILCoin.addBlock({retailer_name:'one',catalog:[{
    'potato':100,
    'tomato':200,
    'corn':150,

}]});
CILCoin.addBlock({retailer_name:'two',catalog:[{
    'potato':1000,
    'tomato':2000,
    'corn':1500,

}]});
CILCoin.addBlock({retailer_name:'three',catalog:[{
    'potato':10,
    'tomato':20,
    'corn':15,

}]});


console.log(JSON.stringify(CILCoin, null, 4));
console.log("Validity: ", CILCoin.chainIsValid());

//now assume that the data for retailer name is changed. This isn't reflected in the block.HEnce checking validity 
//of this changed name should return flase. Look into prev hash to understand why this returns false.
CILCoin.chain[0].data.retailer_name = "ten";
console.log(JSON.stringify(CILCoin,null,4))
console.log("Validity: ", CILCoin.chainIsValid());
