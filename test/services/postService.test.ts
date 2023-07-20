import { buildPost } from '../../src/services/postService';
import textPostJson from '../fixtures/textPost.json';
import imagePostJson from '../fixtures/imagePost.json';
import videoPostJson from '../fixtures/videoPost.json';
import imageCarouselPostJson from '../fixtures/imageCarouselPost.json';
import videoQuotePostJson from '../fixtures/videoQuotePost.json';

jest.mock('../../src/services/threadsService', () => ({
    postGraphQl: jest.fn().mockImplementation(() => Promise.resolve(textPostJson)),
    postBulkRouteDefinitions: jest.fn().mockImplementation(() => Promise.resolve({ payload: { payloads: { ['test-path']: { result: { exports: { rootView: { props: { post_id: 'test-post-id' } } } } } } } }))
}));

jest.mock('../../src/constants/headers', () => ({
    buildPostGraphQlHeaders: jest.fn().mockReturnValue('test-headers'),
}));

jest.mock('../../src/constants/body', () => ({
    buildPostPayload: jest.fn().mockReturnValue('test-body'),
}));

jest.mock('../../src/services/metadataService', () => ({
    buildPostMetadata: jest.fn().mockImplementation((post) => post),
}));

describe('buildPost', () => {
    it('gets the correct post from a post containing only text', () => {
        const postUrl = new URL(textPostJson._source);
        const result = buildPost(textPostJson, postUrl);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/357376107_1330597350674698_8884059223384672080_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=amA3P59eu8kAX8wBYOr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDqZJVtOS6vHAIQbQ5bbPjhuiFQc8zNMcxtptUG-ijWxw&oe=64BCAFC0&_nc_sid=10d13b',
            username: 'zuck',
            caption: 'Open sourcing Llama 2 today. What do you want to see researchers and businesses build with our next-gen large language model?',
            likeCount: 16919,
            replyCount: 2425,
            imageUrls: [],
            hasImage: false,
            videoUrls: [],
            hasVideo: false,
            originalWidth: 612,
            originalHeight: 612,
            engagement: '💬 2,425&emsp;❤️ 16,919',
            description: 'Open sourcing Llama 2 today. What do you want to see researchers and businesses build with our next-gen large language model?\n\n💬 2,425&emsp;❤️ 16,919',
            url: textPostJson._source,
            sharedPosts: [],
            isQuoted: false,
            isRepost: false,
        });
    });

    it('gets the correct post from a post containing a single image', () => {
        const postUrl = new URL(imagePostJson._source);
        const result = buildPost(imagePostJson, postUrl);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/357376107_1330597350674698_8884059223384672080_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=amA3P59eu8kAX-F1ha2&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD5qBkmiXChhlg6u418saVj9YGAy4844wxT2FaOw45gBg&oe=64BCAFC0&_nc_sid=10d13b',
            username: 'zuck',
            caption: 'Calm morning on the lake before another big week ahead.',
            likeCount: 56543,
            replyCount: 4698,
            imageUrls: [
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfD09C5BFdarAv0zWbmY73M8m8NAS-ss-23V4ItJMRtVaA&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfACSUGrL_RVpJhKeGvkGYeQ_ARc9ZKT3vVG3gofT7Tuyg&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=dst-jpg_e35_s720x720&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfBVlJUU14MZzRcVgmCc49MoaKr15mIveEPY1bB8YvRf8g&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfATznTCa-4ewqgEFJbcIXPLTUpk_yaK3b3ZXDtXVD3HQw&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=dst-jpg_e35_s480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfDjNuuPFd77bkz5zZoqL2hV1uVFCDKRjykQpNtGngetfA&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=dst-jpg_e35_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfCpGyYpVbYORDewmQodtMcYuNzjXAv4x1GHpEMjmaXo-g&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=dst-jpg_e35_s240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfCsrWRaQoVUhDoMvM9XZFcJqy_5Kg8kuOZGdbE4GX1wQg&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=c500.0.3000.3000a_dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfBxOycw4qkeW9s6Ruf-dIbnMKQ-1ipARvTMam7lmYbcZQ&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=c500.0.3000.3000a_dst-jpg_e35_s750x750_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfDt3XRbC5EIQ2v6IqcD6148iUkszgz3vgiV4AOry2Ealw&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=c500.0.3000.3000a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfDY_P9jfW9U_gAvlrSODZeBVDI5y65FZyoj0UWc6JtQOQ&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=c500.0.3000.3000a_dst-jpg_e35_s480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfCZnDxvIdCuOA1GQkzG8kleuVXfk3fi4snTnyyRUSFJ9Q&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=c500.0.3000.3000a_dst-jpg_e35_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfC9Ai_BugcNY9utv0Fy1n24QA_VIIUfKV8NRVQnL4_qxg&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=c500.0.3000.3000a_dst-jpg_e35_s240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfBs7yv9V6lhLQ0g-WvBe9RKiHXPzIyV0HmTk3utTmrlyQ&oe=64BC63B4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=c500.0.3000.3000a_dst-jpg_e35_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfAnbtxYmQPf02BUhkA7mJk2vJzKyaJt2nkBd0vnGTNujA&oe=64BC63B4&_nc_sid=10d13b",
            ],
            hasImage: true,
            videoUrls: [],
            hasVideo: false,
            originalWidth: 4000,
            originalHeight: 3000,
            engagement: '💬 4,698&emsp;❤️ 56,543',
            description: 'Calm morning on the lake before another big week ahead.\n\n💬 4,698&emsp;❤️ 56,543',
            url: imagePostJson._source,
            sharedPosts: [],
            isQuoted: false,
            isRepost: false,
        });
    });

    it('gets the correct post from a post containing multiple images', () => {
        const postUrl = new URL(imageCarouselPostJson._source);
        const result = buildPost(imageCarouselPostJson, postUrl);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358511392_816713223024195_6650998157517761865_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=SElTWAUjXgwAX--8cJU&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDPHmTG4vIaryUKoVgDxoWlxMBvh20AvdhNGxJnN9tLAQ&oe=64BD9322&_nc_sid=10d13b',
            username: 'khloekardashian',
            caption: 'True, Dream, Grey Kitty and I are having a sleepover tonight 🩷',
            likeCount: 23350,
            replyCount: 1018,
            imageUrls: [
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2-ccb7-5&oh=00_AfC2WtZ5gEEavEf0LLwJFX_R6AgNjneUjnEY3H7LX9o6pQ&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2-ccb7-5&oh=00_AfBLTzsBs0EOWxZlY5DbqsTTX915bBay4AL3sCutunJWvg&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=dst-jpg_e35_p750x750_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2-ccb7-5&oh=00_AfDi_k_HCpGBkFmlY3DaCRsN6QuL0BfBkuliAmRKkJuSGQ&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2-ccb7-5&oh=00_AfASBSuuZI5jDP3nNhVBlgauAMlA0Nr5F6KCXMiUhJq1Qw&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2-ccb7-5&oh=00_AfB77cLIvKr2wEhaPY2EdrB9l7PXXoyFCPmRGfFK-8im5g&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=dst-jpg_e35_p320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2-ccb7-5&oh=00_AfCPqP9iapImEjRJxLLVgXt4y54LjqpCaF1ctpqjrUcI8w&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=dst-jpg_e35_p240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2-ccb7-5&oh=00_AfBFL-j8iWNY1gxu8bIcZppfN6chJWKZ4LIROvLcHT2k8w&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=dst-jpg_e35_p150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2-ccb7-5&oh=00_AfAm-ZKrF0_pC6izmOE9xqtllj0dykjSaUvoc5fA6TvPAw&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=c0.240.1440.1440a_dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2.c-ccb7-5&oh=00_AfAdL5oPonB-ocoyIFMZOUTY-NqljSAeiGBkriD93_e8zw&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=c0.240.1440.1440a_dst-jpg_e35_s750x750_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2.c-ccb7-5&oh=00_AfCTSx72eZctogsuDoPp_wjYyrL1-hpPcuAggheZu8i0kA&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=c0.240.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2.c-ccb7-5&oh=00_AfAK5rCplgNeLy0CCSyDGnLY0ozdTLLpJmIJuOGdDw0S2w&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=c0.240.1440.1440a_dst-jpg_e35_s480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2.c-ccb7-5&oh=00_AfDWc2xco4wId3bEKQuOBHq83kNpbdu8sWpyETFi5t4LWA&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=c0.240.1440.1440a_dst-jpg_e35_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2.c-ccb7-5&oh=00_AfDXZ3Otd2hTmMQRC-B19cpLLmQXkH5G6NOZIhIR79mBvA&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=c0.240.1440.1440a_dst-jpg_e35_s240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2.c-ccb7-5&oh=00_AfBslpN0qiOlvxDEXv254LHGhBdxnoz6Fhq8-r9D4Y9TNg&oe=64BDA346&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358112198_263973443016284_3528560401145777071_n.jpg?stp=c0.240.1440.1440a_dst-jpg_e35_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=Om7rzKn7KLUAX-6N3LU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODM1MzEyOTkzNg%3D%3D.2.c-ccb7-5&oh=00_AfARYfq8a6hnZ5evpTXKev5Calc5QG9oy0pg7D6SW4Tisw&oe=64BDA346&_nc_sid=10d13b",
            ],
            hasImage: true,
            videoUrls: [],
            hasVideo: false,
            originalWidth: 612,
            originalHeight: 612,
            engagement: '💬 1,018&emsp;❤️ 23,350',
            description: 'True, Dream, Grey Kitty and I are having a sleepover tonight 🩷\n\n💬 1,018&emsp;❤️ 23,350',
            url: imageCarouselPostJson._source,
            sharedPosts: [],
            isQuoted: false,
            isRepost: false,
        });
    });

    it('gets the correct post from a post containing a single video', () => {
        const postUrl = new URL(videoPostJson._source);
        const result = buildPost(videoPostJson, postUrl);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358047728_274818111888708_7050060929439619083_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=RL95IlXGvWQAX-bo-M1&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDIobXPSfoj7f2RZOjvsuTGdE-ohZIO73ZD6tPdMOtp2g&oe=64BC8804&_nc_sid=10d13b',
            username: 'nike',
            caption: 'A slippery banana peel. A 24-year nap. And a fever dream full of football’s greatest athletes. This is football in 2023—it’s a great day to be awake.\n\nKnow their names. Know their game.',
            likeCount: 2835,
            replyCount: 167,
            imageUrls: [
                "https://scontent.cdninstagram.com/v/t51.2885-15/361389838_987726848924849_5639668594460110207_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=tvohmhoICAUAX-8MDzz&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAn0pixWUqzIE3z8JVNQr6gJ8KylKuP6KPshwFO43QoaA&oe=64BA0CF1&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361389838_987726848924849_5639668594460110207_n.jpg?stp=dst-jpg_e15_s480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=tvohmhoICAUAX-8MDzz&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCeHp_tfozQp8vYJ2j8rIVVUAlT7bEEkQDSlNgglL-fNg&oe=64BA0CF1&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361389838_987726848924849_5639668594460110207_n.jpg?stp=dst-jpg_e15_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=tvohmhoICAUAX-8MDzz&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBiR7sLJ0NyClMzMM9kKQDQ7jq3LK0VQSCQmS2CVnGdJg&oe=64BA0CF1&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361389838_987726848924849_5639668594460110207_n.jpg?stp=dst-jpg_e15_s240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=tvohmhoICAUAX-8MDzz&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAUOGGpIOHIy1-_r-9pOc-LlpicwsYP9igdbGt5c6Gvmw&oe=64BA0CF1&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361389838_987726848924849_5639668594460110207_n.jpg?stp=dst-jpg_e15_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=tvohmhoICAUAX-8MDzz&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAPenzQ_lwPZjPoz_bGVkn2BqQgDUxOE2_6ydgOV6nTdA&oe=64BA0CF1&_nc_sid=10d13b"
            ],
            hasImage: true,
            videoUrls: [
                "https://scontent.cdninstagram.com/v/t50.2886-16/10000000_762695492273731_9039734211839283778_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=VhocpdPCRN8AX84YOA7&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCsNSkiO0ngHcfQJQeT-gSuh-Q39G4EKzvwpRbvvMAYsw&oe=64BA0B68&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t50.2886-16/10000000_762695492273731_9039734211839283778_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=VhocpdPCRN8AX84YOA7&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCsNSkiO0ngHcfQJQeT-gSuh-Q39G4EKzvwpRbvvMAYsw&oe=64BA0B68&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t50.2886-16/10000000_762695492273731_9039734211839283778_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=VhocpdPCRN8AX84YOA7&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCsNSkiO0ngHcfQJQeT-gSuh-Q39G4EKzvwpRbvvMAYsw&oe=64BA0B68&_nc_sid=10d13b",
            ],
            hasVideo: true,
            originalWidth: 640,
            originalHeight: 640,
            engagement: '💬 167&emsp;❤️ 2,835',
            description: 'A slippery banana peel. A 24-year nap. And a fever dream full of football’s greatest athletes. This is football in 2023—it’s a great day to be awake.\n\nKnow their names. Know their game.\n\n💬 167&emsp;❤️ 2,835',
            url: videoPostJson._source,
            sharedPosts: [],
            isQuoted: false,
            isRepost: false,
        });
    });

    it('gets the correct post from a post containing a quote with a single video', () => {
        const postUrl = new URL(videoQuotePostJson._source);
        const result = buildPost(videoQuotePostJson, postUrl);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358047728_274818111888708_7050060929439619083_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=RL95IlXGvWQAX_jYGWC&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBkl-oWN_HiW2Ne9zuS3n9NGQgqG80VqrFxbJoXq6HyfQ&oe=64BC8804&_nc_sid=10d13b',
            username: 'nike',
            caption: 'Today’s the day. Who’s excited for Wemby’s NBA debut? 🙋\n\n⤵️ Quoting @nba\n\nOne more sleep until…',
            likeCount: 22259,
            replyCount: 1170,
            imageUrls: [
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDq8VbxSRAaDI56lXJ8aXvX6UDUO2YjoqyfnzRQ3bOOEg&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15_p480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBidi52fuKOyrBAT_aOcajslZ5W3AwSjKVXAz3KiCasUQ&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15_p320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDDzsK4Vdd0LOBjnsC4A1W0-99lF_eHsRgvvpSJ1Lu8oA&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15_p240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCy0iyIdA84qxqLf3cFxRWQyKtVCncDD2SwQGRIYbsxCA&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15_p150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCzsDkqU6jyYRL33Ee6N5ZSnVrY08WTXekH4GtQn-HkBA&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAPl3-mUNRChstFNaeCgS-CVKAZSGidjMfuhOOlD4MT0w&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15_s480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD2jyo_MtE9V3_Nt0Aenc6U-xBI0OnKLyC5nhxZdJn_wA&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDcZs1F_06AQkBE7LO7Ffpk-eWAtrjtVJoIfu9-RTtBRA&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15_s240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAI7BWz_XXTr-Zl0Vw6c0Z_BcbSGgqoATdhnxUoYQcPHQ&oe=64BA3498&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDRvmLZH2ldhwCqQNQELKnoiAv6DlE9X5NMUY_kAMbWBw&oe=64BA3498&_nc_sid=10d13b",
            ],
            hasImage: true,
            videoUrls: [
                "https://scontent.cdninstagram.com/v/t50.2886-16/10000000_943161356801998_1044776441380441895_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=SppcHWTFELAAX-ZXNmt&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDqJgTi0COihzRwU9E4bBGWcEOKwPNbZH5w4A5-eejvYg&oe=64B9D9F3&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t50.2886-16/10000000_943161356801998_1044776441380441895_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=SppcHWTFELAAX-ZXNmt&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDqJgTi0COihzRwU9E4bBGWcEOKwPNbZH5w4A5-eejvYg&oe=64B9D9F3&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t50.2886-16/10000000_943161356801998_1044776441380441895_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=SppcHWTFELAAX-ZXNmt&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDqJgTi0COihzRwU9E4bBGWcEOKwPNbZH5w4A5-eejvYg&oe=64B9D9F3&_nc_sid=10d13b"
            ],
            hasVideo: true,
            originalWidth: 640,
            originalHeight: 800,
            engagement: '💬 1,170&emsp;❤️ 22,259',
            description: 'Today’s the day. Who’s excited for Wemby’s NBA debut? 🙋\n\n⤵️ Quoting @nba\n\nOne more sleep until…\n\n💬 1,170&emsp;❤️ 22,259',
            url: videoQuotePostJson._source,
            sharedPosts: [
                {
                    profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358213019_186216880851983_5492715861352160006_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=FsYJCyjRr6kAX80poTe&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCbJd5SjbkBDQQ-uMfA6uuzB5kFwooXqgxQTMnl7Mslbg&oe=64BD6AF0&_nc_sid=10d13b',
                    username: 'nba',
                    caption: 'One more sleep until…',
                    likeCount: 17429,
                    replyCount: 801,
                    imageUrls: [
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDq8VbxSRAaDI56lXJ8aXvX6UDUO2YjoqyfnzRQ3bOOEg&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15_p480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBidi52fuKOyrBAT_aOcajslZ5W3AwSjKVXAz3KiCasUQ&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15_p320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDDzsK4Vdd0LOBjnsC4A1W0-99lF_eHsRgvvpSJ1Lu8oA&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15_p240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCy0iyIdA84qxqLf3cFxRWQyKtVCncDD2SwQGRIYbsxCA&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15_p150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCzsDkqU6jyYRL33Ee6N5ZSnVrY08WTXekH4GtQn-HkBA&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAPl3-mUNRChstFNaeCgS-CVKAZSGidjMfuhOOlD4MT0w&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15_s480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD2jyo_MtE9V3_Nt0Aenc6U-xBI0OnKLyC5nhxZdJn_wA&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDcZs1F_06AQkBE7LO7Ffpk-eWAtrjtVJoIfu9-RTtBRA&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15_s240x240&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAI7BWz_XXTr-Zl0Vw6c0Z_BcbSGgqoATdhnxUoYQcPHQ&oe=64BA3498&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=c0.80.640.640a_dst-jpg_e15_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDRvmLZH2ldhwCqQNQELKnoiAv6DlE9X5NMUY_kAMbWBw&oe=64BA3498&_nc_sid=10d13b'
                    ],
                    hasImage: true,
                    videoUrls: [
                        'https://scontent.cdninstagram.com/v/t50.2886-16/10000000_943161356801998_1044776441380441895_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=SppcHWTFELAAX-ZXNmt&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDqJgTi0COihzRwU9E4bBGWcEOKwPNbZH5w4A5-eejvYg&oe=64B9D9F3&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t50.2886-16/10000000_943161356801998_1044776441380441895_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=SppcHWTFELAAX-ZXNmt&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDqJgTi0COihzRwU9E4bBGWcEOKwPNbZH5w4A5-eejvYg&oe=64B9D9F3&_nc_sid=10d13b',
                        'https://scontent.cdninstagram.com/v/t50.2886-16/10000000_943161356801998_1044776441380441895_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=SppcHWTFELAAX-ZXNmt&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDqJgTi0COihzRwU9E4bBGWcEOKwPNbZH5w4A5-eejvYg&oe=64B9D9F3&_nc_sid=10d13b'
                    ],
                    hasVideo: true,
                    originalWidth: 640,
                    originalHeight: 800,
                    engagement: '💬 801&emsp;❤️ 17,429',
                    description: 'One more sleep until…\n\n💬 801&emsp;❤️ 17,429',
                    url: 'https://www.threads.net/@nike/post/CuaNNJVvRga',
                    sharedPosts: [],
                    isQuoted: true,
                    isRepost: false
                }
            ],
            isQuoted: false,
            isRepost: false,
        });
    })
});
