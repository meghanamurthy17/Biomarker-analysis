// this class adds the data index and hash to each block
class Block{

    constructor(index, data, prevHash){

        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.getHash();
    }
    getHash(){
        return (JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);
        }

}
class BlockChain{
	constructor(){
		this.chain = [];
    }
    addBlock(data){
        let index = this.chain.length;
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0
        let block = new Block(index, data, prevHash);
        this.chain.push(block);
        }
        chainIsValid(){

            for(var i=0;i<this.chain.length;i++){
        
                if(this.chain[i].hash !== this.chain[i].getHash()) 
                    return false;
        
                if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)
                    return false;
            }
        
            return true;
        }
}
module.exports=BlockChain;
//const CILCoin = new BlockChain();
