class User{
    constructor(name, mannerTemp, purchaseList, sellingList, chatList, residence){
        this.name =name;
        this.mannerTemp = mannerTemp;
        this.sellingList = sellingList;
        this.purchaseList = purchaseList
        this.chatList = chatList;
        this.residence = residence;
        //판매물품, 채팅목록 구현을 어떻게 해야?
    }

    name(params) {
        
    }
}

class category {
    setWeapon(weapon) {
        this.weapon = weapon;
    };

    showCategory() { 
        this.weapon.fire();
    };
};

class clothes {
    showCategory() {
        console.log('Fire a missile.');
    };
};

class Bomb7 {
    showCategory() {
        console.log('Fire a bomb.');
    };
};

//당근
//1. 물품 구매 2. 모임 구하기 3. 장소(미용실, 음식점...) 예약
/* 1. 중고 거래
처음 들어오면 자기 지역의 판매 물품들을 보여줌
물품 선택시 좋아요를 설정할 수 있고 관심있는 상품으로 넘어감
관심있는 상품의 경우 판매자가 가격을 내리거나 판매를 중지할 경우 메세지가 날라감
판매자와 채팅을 시작 

// => 홈메뉴 보여주기(command), 판매물품 목록, 지역설정 
// 유저정보: 닉네임, 성별, 온도   

const category = new category();
weapon7.setWeapon(new Missile7()); 
weapon7.showCategory(); 
weapon7.setWeapon(new Bomb7());
weapon7.showCategory(); 

//명령어 패턴: 
//전략 패턴:
//옵저버 패턴: 가격내림시 좋아요를 한 회원에게 메세지가 감*/