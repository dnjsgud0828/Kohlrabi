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
        console.log(this.observers);
        this.notify();
    }
}

// class category {
//     setWeapon(weapon) {
//         this.weapon = weapon;
//     };

//     showCategory() { 
//         this.weapon.fire();
//     };
// };

// class clothes {
//     showCategory() {
//         console.log('Fire a missile.');
//     };
// };

// class Bomb7 {
//     showCategory() {
//         console.log('Fire a bomb.');
//     };
// };

//main 실행문
const user = new User('원형', 36.5, 'Namyangju');
user.sellProduct('robot', 15000);
user.changePrice(5000);
/*당근


// => 홈메뉴 보여주기(command), 판매물품 목록, 지역설정 

명령어 패턴: 
전략 패턴: 
옵저버 패턴: 가격내림시 좋아요를 한 회원에게 메세지가 감
팩토리 패턴

글 작성 => 어떤 분야에 따라서 다르게, 거래/모임/예약/후기: 전략패턴
가격이 내려갔을 경우: 옵저버 패턴
메소드 실행시 notify 실행
다른 객체의 메소드 실행을 notify 하는법
좋아요 버튼을 눌렀을 경우 소비자를 옵저버 아님 메소드

class User
{
    constructor(){

    }
    가격 내리기(){
        this.observers.notify()
    }
    notify(){
        console.log("가격이 내려갔습니다!");
    }
}

클래스 물품{
    update(){
        console.log("가격이 내려갔습니다!");
    }
}

사용자에게 콘솔 목록 보여주기 => 명령어 패턴

*/