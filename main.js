class User{
    constructor(name, mannerTemp, residence){
        this.name =name;
        this.mannerTemp = mannerTemp;
        this.sellingList = []; //판매물품
        this.purchaseList = []; //구매목록
        this.zzimList=[];
        this.chatList = []; //채팅목록
        this.residence = residence;
        this.productManager =new ProductManager();
    }

    addInterest(product) { //관심목록 추가
        this.zzimList.push(product);
    }

    update(product) {
        console.log(`${product}의 가격이 변경되었습니다!`);
    }

    sellProduct(name, price, type){
        this.productManager.sellProduct(name, price, type);
       //해당 제품에 대한 설명
       //사진 추가
    }

    changePrice(productName, price) { //가격 변동
        const product = this.user.sellingList.find(p => p.name === productName);
        if (product) {
            product.discount(price);
        } else {
            console.log('Product not found.');
        }
    }

    purchaseProduct(){//물품 구매

    }

    registerMeeting(){ //모임 등록

    }  
    
    reserveStore(){ //매장 예약

    }
}

class System { //목록 출력을 명령어 패턴을 사용하여 작성
    constructor(){

    }

    setCategoryCommand(categoryCommand){
        this.categoryCommand = categoryCommand;
    }

    show(){
        this.categoryCommand.showCategory();
    }
}

//구매기능
class product{ //구매 글을 올릴 때 해당 클래스의 인스턴스를 전달
    constructor(name, price, type){
        this.name = name; //상품명
        this.price = price; //가격
        this.type= type;// 품목
        this.state = 0; //0이 디폴트(0: 판매중, 1: 거래 완료, 2: 거래 진행중)
        this.observers=[]; 
    }

    attach(observer) {
        this.observers.push(observer);
    }

    detach(observer) {
        this.observers = this.observers.filter(e => e !== observer);
    }

    notify(){
        this.observers.forEach(e=> e.update(this.name)); //물품이 감시하고 있는 유저들에게 알림
    }

    discount(price){
        this.price-=price;
        this.notify();
    }
}

class Command {
    showClothes() {
        console.log("-------------판매물품-------------");
        let i=0;
        for (let e of sellingList){
            if(sellingList[e].type=='clothes'){
                console.log(`${i}. ${sellingList[e]}`);
                i++;
            } 
        }
    };

    showFoods() { 
        console.log("-------------판매물품-------------");
        let i=0;
        for (let e of sellingList){
            if(sellingList[e].type=='food'){
                console.log(`${i}. ${sellingList[e]}`);
                i++;
            } 
        }
    };

    showToys() {
        console.log("-------------판매물품-------------");
        let i=0;
        for (let e of sellingList){
            if(sellingList[e].type=='toy'){
                console.log(`${i}. ${sellingList[e]}`);
                i++;
            } 
        }
    }

};

class Clothes extends Product{
    constructor(name, price, sex, size){
        super(name, price);
        this.sex = sex;
        this.size = size;
        this.category = new Command();
    }

    showCategory(){
        this.category.showClothes();
    }
};

class Food extends Product{
    constructor(name, price, expirationDate){
        super(name, price);
        this.expirationDate = expirationDate;
        this.category = new Command();
    }

    showCategory(){
        this.category.showFoods();
    }
};

class Toy extends Product{
    constructor(name, price){
        super(name, price);
        this.category = new Command();
    }

    showCategory(){
        this.category.showToys();
    }
}

class ProductManager {
    constructor(user) {
        this.user = user;
    }

    sellProduct(name, price, type) {
        let product;
        switch (type) {
            case 'Clothes':
                const sex = 'Male';
                const size = 'XL';
                product = new Clothes(name, price, sex, size);
                break;
            case 'Food':
                const expirationDate = '2024-07-08';
                product = new Food(name, price, expirationDate);
                break;
            case 'Toy':
                product = new Toy(name, price);
                break;
            default:
                throw new Error('Invalid product type');
        }

        this.user.sellingList.push(product);
        product.attach(this.user);
    }
}

//main 실행문
console.log("------------콜라비-----------");
const sys = new System();
const user1 = new User('원형', 36.5, '남양주');
const user2 = new User('한별', 36.5, '서울');
const user3 = new User('고윤정', 36.5, '서울');
user1.sellProduct('robot', 15000, 'toy');

console.log('-----------------------------\n1. 중고거래 \n2. 예약 \n3. 인원 모집\n-----------------------------');
let type = 'toy' //장난감을 구매한다 가정
switch(type){
    case 'clothes':{
        sys.setCategoryCommand(new Clothes());
        break;
    }
    case 'food':{
        sys.setCategoryCommand(new Food());
        break;
    }
    case 'toy':{
        sys.setCategoryCommand(new Toy());
        break;
    }      
}
sys.show();
user2.addInterest('robot');
user1.changePrice(5000);

//1. observer가 관측하는 대상
//2. command pattern
//3. 문자열을 입력해서, 해당 객체를 찜리스트에 넣기
//4. 
//추가로 구현해야하는 대상들