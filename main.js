class User{
    constructor(name, mannerTemp, residence){
        this.name =name; //닉네임
        this.mannerTemp = mannerTemp;
        this.sellingList = []; //판매물품
        this.purchaseList = []; //구매목록
        this.zzimList=[]; //관심목록
        this.residence = residence; //거주지
    }

    update(product) { 
        console.log(`${product}의 가격이 변경되었습니다!`);
    }
}

class Store{
    constructor(name, phone){
        this.name =name; //가게명
        this.phone = phone; //가게 전화번호
    }
}

class Club{
    constructor(name, phone, people, maxPeople){
        this.name = name; //동아리 이름
        this.phone = phone; //전화번호
        this.people = people; //현재인원
        this.maxPeople = maxPeople; //최대인원
    }
}

class Description { //상세설명을 작성하는 class
    addPhoto() {
        try{
            console.log("사진을 올려주세요.");
            console.log("업로드 완료!");
        }
        catch{
            console.log("오류발생!");
        }
    }
    writeDescription(){
        console.log("설명글을 작성해주세요!");
    }  
}

class Location{ //지역 설정 클래스
    setMyLocation(){
        console.log("현재 거주하고 있는 지역을 설정해주세요.");
        console.log("거래 지역 범위를 설정해 주세요.");
    }
    setTradingLocation() {
        console.log("거래 장소를 설정합니다.");
    }
}

class Communication{ //다른 사용자와 의사소통을 진행하는 클래스
    chat() { //채팅
        try{
            console.log("채팅이 시작됩니다.");
        }
        catch{
            console.log("오류발생!");
        }
    }

    reserveByPhone(phone){ //전화 예약
        console.log(`----${phone}로 전화를 겁니다.----`);
    }
}

class ProductManager {//물품 거래 관리 클래스
    constructor(){
        this.description = new Description();
        this.location = new Location();
        this.cummunication =new Communication();
    }

    addInterest(productName, seller, consumer) { //관심목록 추가
        const product = seller.sellingList.find(p => p.name === productName);
        consumer.zzimList.push(product);
        product.attach(consumer);
    }

    sellProduct(name, price, type, seller){ //물품판매
        let product;
        const SELLINGLIST = seller.sellingList; //판매자의 판매목록
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
        this.description.writeDescription();//설명글 작성
        this.description.addPhoto();//사진추가
        this.location.setLocation(); //거래 장소 설정
    }

    purchaseProduct(product){//물품 구매
        this.cummunication.chat();
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

class ReserveManager{ //예약관리
    constructor(){
        this.description = new Description();
        this.location = new Location();
        this.cummunication = new Communication();
    }
    
    addStore(name, phone){ //가게 홍보글 게시
        storeList.push(new Store(name, phone));

        this.description.writeDescription();
        this.description.addPhoto();
        this.location.setLocation();
    }   

    reserveStore(phone){
        this.cummunication.chat();
        this.cummunication.reserveByPhone(phone);
    }
}

class ClubManager{ //모임 관리
    constructor(){
        this.description = new Description();
        this.location = new Location();
        this.cummunication = new Communication();
    }
    
    addClub(name, phone){
        clubList.push(new Club(name, phone));

        this.description.writeDescription();
        this.description.addPhoto();
        this.location.setLocation();
    }

    participateClub(phone){
        this.cummunication.chat();
        this.cummunication.reserveByPhone(phone);
    }
}

class Product{ //제품 클래스
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
        this.observers.forEach(e=> e.update(this.name)); //물품이 제품을 추가한 유저들에게 알림
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

class Command { //명령어
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
console.log("--------------콜라비-------------\n");
const sellingList =[];
const storeList=[];
const clubList=[];

//임의의 물품 목록 추가
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

//물품 거래 과정
const productManager = new ProductManager();
const seller = new User('김원형', 36.5, '남양주');
const consumer = new User('김한별', 36.5, '노원');
productManager.sellProduct('robot', 450000, 'toy', seller);
productManager.addInterest('robot', seller, consumer);
productManager.changePrice('robot', 5000, seller);

//가게 목록
storeList.push(new Store('가게1', '02-111-1111'));
storeList.push(new Store('가게2', '02-222-2222'));
storeList.push(new Store('가게3', '02-333-3333'));
storeList.push(new Store('가게4', '02-444-4444'));

//가게 등록 및 예약과정
const reserveManager = new ReserveManager();
reserveManager.addStore('가게5', '02-555-5555'); //가게 등록
reserveManager.reserveStore(storeList[3].phone); //가게 예약

//모임 목록
clubList.push(new Club('클럽1', '02-666-6666', 10, 30));
clubList.push(new Club('클럽2', '02-777-7777', 17, 20));
clubList.push(new Club('클럽3', '02-888-8888', 28, 50));

//모임 등록 및 참가
const clubManager = new ClubManager();
clubManager.addClub('클럽4', '02-999-9999');
clubManager.participateClub(clubList[1].phone);

//사용한 디자인 패턴: Facade(Func -> ProductManager... ), Observer, Command => show