class User{
    constructor(name, mannerTemp, residence){
        this.name =name;
        this.mannerTemp = mannerTemp;
        this.sellingList = []; //판매물품
        this.purchaseList = []; //구매목록
        this.zzimList=[];
        this.chatList = []; //채팅목록
        this.residence = residence;
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

    setLocation(residence) {
        if(residence==){
            console.log("거래 장소를 설정합니다.");
        }
        else{
            console.log("거래할 수 없는 지역입니다!");
        }
    }

    writeDescription(){
        console.log("설명글을 작성해주세요!");
    }
}

class ProductManager{
    constructor(user){
        this.user = user;
        this.func = new Func();
    }

    addInterest(product) { //관심목록 추가
        this.zzimList.push(product);
    }

    sellProduct(name, price, type){ //물품판매
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

        this.func.writeDescription();//설명글 작성
        this.func.addPhoto();//사진추가
        this.func.setLocation(); //거래 장소 설정
    }

    purchaseProduct(){//물품 구매
        this.func.chat();
        //거래 완료시 물품의 상태 변경
        //판매 목록에서 물품제거
    }

    changePrice(productName, price) {
        const product = this.user.sellingList.find(p => p.name === productName);
        if (product) {
            product.discount(price);
        } else {
            console.log('Product not found.');
        }
    }

    update(product) {
        console.log(`${product}의 가격이 변경되었습니다!`);
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

class Print { //목록 출력을 명령어 패턴을 사용하여 작성
    setCategoryCommand(categoryCommand){
        this.categoryCommand = categoryCommand;
    }

    show(){
        this.categoryCommand.showList();
    }

    static showCategory(){
        console.log('-------------메뉴선택------------1. 중고거래 \n2. 예약 \n3. 인원 모집');
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

    showList(){
        this.category.showClothes();
    }
};

class Food extends Product{
    constructor(name, price, expirationDate){
        super(name, price);
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
        this.category = new Command();
    }

    showList(){
        this.category.showToys();
    }
}

//main 실행문
console.log("------------콜라비-----------");


//1. observer가 관측하는 대상
//2. command pattern
//3. 문자열을 입력해서, 해당 객체를 찜리스트에 넣기

//사용한 디자인 패턴: Facade(Func -> ProductManager... ), Observer, Command => show