class User{
    constructor(name, mannerTemp, residence){
        this.name =name;
        this.mannerTemp = mannerTemp;
        this.sellingList = []; //판매물품
        this.purchaseList = []; //구매목록
        this.zzimList=[];
        this.residence = residence;
    }

    update(product) {
        console.log(`${product}의 가격이 변경되었습니다!`);
    }
}

class Func {
    addPhoto() {
        try{
            console.log("사진을 올려주세요.");
            console.log("업로드 완료!");
        }
        catch{
            console.log("오류발생!");
        }
    }

    chat() {
        try{
            console.log("채팅이 시작됩니다.");
        }
        catch{
            console.log("오류발생!");
        }
    }

    setLocation() {
        console.log("거래 장소를 설정합니다.");
    }

    writeDescription(){
        console.log("설명글을 작성해주세요!");
    }
}

class ProductManager{
    constructor(){
        this.func = new Func();
    }

    addInterest(productName, seller, consumer) { //관심목록 추가
        const product = seller.sellingList.find(p => p.name === productName);
        consumer.zzimList.push(product);
        product.attach(consumer);
    }

    sellProduct(name, price, type, seller){ //물품판매
        let product;
        const SELLINGLIST = seller.sellingList; 
        switch (type) {
            case 'clothes':
                const sex = 'Male';
                const size = 'XL';
                product = new Clothes(name, price, sex, size);
                break;
            case 'food':
                const expirationDate = '2024-07-08';
                product = new Food(name, price, expirationDate);
                break;
            case 'toy':
                product = new Toy(name, price);
                break;
            default:
                throw new Error('잘못된 제품 타입');
        }

        SELLINGLIST.push(product);

        console.log("----제품에 대한 설명과 사진, 거래장소를 설정해 주세요.----");
        this.func.writeDescription();//설명글 작성
        this.func.addPhoto();//사진추가
        this.func.setLocation(); //거래 장소 설정
    }

    purchaseProduct(product){//물품 구매
        this.func.chat();
        product.state = 0; //거래중
        if(true){ //거래가 성사되었을 때 수행
    
        }
        else {
            product.state =1; //다시 판매중 상태로 변경
        }
        //거래 완료시 물품의 상태 변경
        //판매 목록에서 물품제거
    }

    changePrice(productName, price, seller) {
        const product = seller.sellingList.find(p => p.name === productName);
        if (product) {
            console.log("----제품의 가격을 변경합니다.----");
            product.discount(price);
        } else {
            console.log('제품을 찾을 수 없습니다.');
        }
    }  
}

class ClubManager{ //모임 관리
    constructor(){
        this.func = new Func();
    }
    
    addClub(){
        this.func.writeDescription();
        this.func.addPhoto();
        this.func.setLocation();
    }

    participateClub(){
        this.func.chat();
    }
}

class ReserveManager{ //예약관리
    constructor(){
        this.func = new Func();
    }
    
    addStore(){ //가게 홍보글 게시
        this.func.writeDescription();
        this.func.addPhoto();
        this.func.setLocation();
    }   

    reserveStore(){
        this.func.chat();
    }
}

class Product{ //구매 글을 올릴 때 해당 클래스의 인스턴스를 전달
    constructor(name, price, type){
        this.name = name; //상품명
        this.price = price; //가격
        this.type= type;// 품목
        this.state = 1; //1이 디폴트(0: 거래 진행중, 1: 판매중)
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

class Print { //목록 출력을 Command pattern을 사용하여 작성
    setCategoryCommand(categoryCommand, sellingList){
        this.categoryCommand = categoryCommand;
        this.sellingList = sellingList;
    }

    showList(){
        this.categoryCommand.showList();
    }

    static showCategory(){
        console.log('-------------메뉴선택------------\n1. 중고거래 \n2. 예약 \n3. 인원 모집');
    }
}

class Command {
    showClothes() {
        console.log("-------------판매물품-------------");
        let i=0;
        for (let e of sellingList){
            if(e.type=='clothes'){
                console.log(`${i}. ${e.name}`);
                i++;
            } 
        }
    };

    showFoods() { 
        console.log("-------------판매물품-------------");
        let i=0;
        for (let e of sellingList){
            if(e.type=='food'){
                console.log(`${i}. ${e.name}`);
                i++;
            } 
        }
    };

    showToys() {
        console.log("-------------판매물품-------------");
        let i=0;
        for (let e of sellingList){
            if(e.type=='toy'){
                console.log(`${i}. ${e.name}`);
                i++;
            } 
        }
    }

};

class Clothes extends Product{
    constructor(name, price, sex, size){
        super(name, price);
        this.sex = sex;
        this.type = 'clothes';
        this.size = size;
        this.category = new Command();
    }

    showList(){
        this.category.showClothes();
    }
};

class Food extends Product{
    constructor(name, price, expirationDate){
        super(name, price);
        this.type = 'food';
        this.expirationDate = expirationDate;
        this.category = new Command();
    }

    showList(){
        this.category.showFoods();
    }
};

class Toy extends Product{
    constructor(name, price){
        super(name, price);
        this.type = 'toy';
        this.category = new Command();
    }

    showList(){
        this.category.showToys();
    }
}

//main 실행문
console.log("------------콜라비-----------");
const sellingList =[];
const clubList=[];
const storeList=[];

let type= 'food';
sellingList.push(new Clothes('c1', 50000, 'Male', 'L'));
sellingList.push(new Clothes('c2', 35000, 'Female', 'S'));
sellingList.push(new Clothes('c3', 50000, 'Male', 'XL'));
sellingList.push(new Food('돈까스', 15000, '2025-07-05'));
sellingList.push(new Food('만두', 10000, '2025-10-04'));
sellingList.push(new Food('치킨', 10000, '2024-10-29'));
sellingList.push(new Toy('Lego', 50000));
const print = new Print();

Print.showCategory(); //목록 출력, 음식을 선택했다 가정
switch(type){
    case 'clothes':
        print.setCategoryCommand(new Clothes(), sellingList);
        print.showList();
        break;
    case 'food':
        print.setCategoryCommand(new Food(), sellingList);
        print.showList();
        break;
    case 'toy':
        print.setCategoryCommand(new Toy(), sellingList);
        print.showList();
        break;
}

const productManager = new ProductManager();
const seller = new User('김원형', 36.5, '남양주');
const consumer = new User('김한별', 36.5, '노원');
productManager.sellProduct('robot', 450000, 'toy', seller);
productManager.addInterest('robot', seller, consumer);
productManager.changePrice('robot', 5000, seller);

//1. observer가 관측하는 대상
//2. command pattern
//3. 문자열을 입력해서, 해당 객체를 찜리스트에 넣기

//사용한 디자인 패턴: Facade(Func -> ProductManager... ), Observer, Command => show