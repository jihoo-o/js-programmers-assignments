const END_POINT =
    'https://cors-anywhere.herokuapp.com/https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev';

export const api = {
    requestProducts: async () => {
        try {
            // const res = await fetch(`${END_POINT}/products`);
            // if (!res.ok) {
            //     // throw new Error('API 통신 실패');
            // }
            // return await res.json();
            return [
                {
                    id: 1,
                    name: '커피 컵',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png',
                    price: 10000,
                },
                {
                    id: 2,
                    name: '커피컵 종이홀더',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/coffee_cup_paper_sleeve.png',
                    price: 1000,
                },
                {
                    id: 3,
                    name: '커피 머신',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/coffee_self_service.png',
                    price: 500000,
                },
                {
                    id: 4,
                    name: '우유 거품기',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cooking_milk_foamer.png',
                    price: 20000,
                },
                {
                    id: 5,
                    name: '우유용 컵',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/drink_cafe_milk_jag.png',
                    price: 10000,
                },
                {
                    id: 6,
                    name: '그렙 커피',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/drink_petbottle_coffee.png',
                    price: 3000,
                },
                {
                    id: 7,
                    name: '에스프레소 메이커',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/espresso_maker.png',
                    price: 50000,
                },
                {
                    id: 8,
                    name: '냉동 샌드위치',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/food_sandwitch.png',
                    price: 10000,
                },
                {
                    id: 9,
                    name: '티 메이커',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/press_tea_maker.png',
                    price: 35000,
                },
                {
                    id: 10,
                    name: '각설탕 묶음',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/sugar_kakuzatou.png',
                    price: 500,
                },
                {
                    id: 11,
                    name: '커피 시럽',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/sweets_milk_cream.png',
                    price: 500,
                },
                {
                    id: 12,
                    name: '에스프레소 머신',
                    imageUrl:
                        'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/espresso_maker_2.png',
                    price: 300000,
                },
            ];
        } catch (e) {
            console.error(e.message);
        }
    },
    requestProduct: async (productId) => {
        try {
            // const res = await fetch(`${END_POINT}/products/${productId}`);
            // if (!res.ok) {
            //     // throw new Error('API 통신 실패');
            // }
            // return await res.json();
            return {
                id: 1,
                name: '커피 컵',
                price: 10000,
                imageUrl:
                    'https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png',
                productOptions: [
                    {
                        id: 1,
                        name: '100개 묶음',
                        price: 0,
                        stock: 5,
                        created_at: '2021-08-23T22:52:17.634Z',
                        updated_at: '2021-08-23T22:52:17.638Z',
                    },
                    {
                        id: 2,
                        name: '200개 묶음',
                        price: 8000,
                        stock: 5,
                        created_at: '2021-08-23T22:52:34.248Z',
                        updated_at: '2021-08-23T22:52:34.252Z',
                    },
                    {
                        id: 24,
                        name: '10개 묶음',
                        price: 100,
                        stock: 10,
                        created_at: '2021-08-23T23:03:04.873Z',
                        updated_at: '2021-08-23T23:03:04.879Z',
                    },
                ],
            };
        } catch (e) {
            console.error(e.message);
        }
    },
};
