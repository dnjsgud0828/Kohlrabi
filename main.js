class User{
    constructor(name, mannerTemp, residence){
        this.name =name;
        this.mannerTemp = mannerTemp;
        this.sellingList = []; //판매물품
        this.purchaseList = []; //구매목록
        this.chatList = []; //채팅목록
        this.residence = residence;
    }

    //판매 물품 등록
    //물품 구매
    //모임 등록
    //매장 예약

    addInterest(product) { //관심목록 추가
        this.product = product;
    }

    update(product) { //바로 작동은 못시킴...?
        console.log(`${product}의 가격이 변경되었습니다!`);
    }

    sellProduct(name, price){
       const a = new product(name, price);
        this.sellingList.push(a);
        a.attach(this);
       //해당 제품에 대한 설명
       //사진 추가
    }

    changePrice(price){
        const a= this.sellingList[0]
        a.discount(price);
    }
}

//구매기능
class product{ //구매 글을 올릴 때 해당 클래스의 인스턴스를 전달
    constructor(product, price){
        this.product = product; //상품명
        this.price = price; //가격
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
        this.observers.forEach(e=> e.update(this.product)); //물품이 감시하고 있는 유저들에게 알림
    }

    discount(price){
        this.price-=price;
        this.notify();
    }
}

class System { //목록 출력을 명령어 패턴을 사용하여 작성
    setCategoryCommand(categoryCommand){
        this.categoryCommand = categoryCommand;
    }

    show(){
        this.categoryCommand.showCategory();
    }
}

class Command {
    showClothes() {
        console.log();
    };

    showShoes() { 
        console.log();
    };

    showToys() {
        console.log("-----------------------------\n1. robot\n2. doll\n3. 로보카 폴리\n------------------------------");
    }

};

class Clothes {
    constructor(){
        this.category = new Command();
    }

    showCategory(){
        this.category.showClothes();
    }
};

class Shoes {
    constructor(){
        this.category = new Command();
    }

    showCategory(){
        this.category.showShoes();
    }
};

class Toy {
    constructor(){
        this.category = new Command();
    }

    showCategory(){
        this.category.showToys();
    }
}

//main 실행문
console.log("------------콜라비-----------");
const sys = new System();
sys.setCategoryCommand(new Toy());
console.log('-----------------------------\n1. 중고거래 \n2. 예약 \n3. 인원 모집\n-----------------------------');
sys.show();
const user = new User('원형', 36.5, 'Namyangju');
user.sellProduct('robot', 15000);
user.changePrice(5000);