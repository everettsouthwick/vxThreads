import { buildPost } from '../../src/services/postService';
import imageCarouselPostJson from '../fixtures/imageCarouselPost.json';
import imagePostJson from '../fixtures/imagePost.json';
import imageQuotePost from '../fixtures/imageQuotePost.json';
import textPostJson from '../fixtures/textPost.json';
import textQuotePostJson from '../fixtures/textQuotePost.json';
import videoCarouselPostJson from '../fixtures/videoCarouselPost.json';
import videoPostJson from '../fixtures/videoPost.json';
import videoQuoteImagePostJson from '../fixtures/videoQuoteImagePost.json';
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
                "https://scontent.cdninstagram.com/v/t51.2885-15/358349760_1465777867512040_8931970900779229993_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=Zj-Jk73zS8cAX9zIlgN&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODI3NzQ1MjcyNA%3D%3D.2-ccb7-5&oh=00_AfAN1JDNtYKLnhY_LPxswfuVRwZK4cm--XcGtUvYh3iYmA&oe=64BCD020&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358386245_2156607024535921_4794021513789678292_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=MmtFmR5Jj1sAX9xhkIA&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODI3NzUxNjUxNg%3D%3D.2-ccb7-5&oh=00_AfAFLl8ppS_gsaYSqSs94aNMhfsNVEoGB75Cp4OPm_8EjA&oe=64BE0058&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358093975_817412676443819_7559947887515357187_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=k7z1-jhXPz0AX8xBVlP&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODI3NzQ5MzE2NA%3D%3D.2-ccb7-5&oh=00_AfDSBkQijWXoz3yV9HEAzJ2RTd6iQysXZ8zKHVZBpRLQhg&oe=64BE2D79&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/358122536_284543050732929_2024918076154498262_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=_WO03Uet-jUAX9EXGEK&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0MTMxMjk5ODI3NzQzNzE3Nw%3D%3D.2-ccb7-5&oh=00_AfBZeFubyS1l_cAOOkZfOT31gzaI-l7diP6OjjuScAXI9w&oe=64BCEC1D&_nc_sid=10d13b"
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
                "https://scontent.cdninstagram.com/v/t51.2885-15/361559968_297695422712140_3208342140432914929_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=5QCKx3ra0qsAX8UXsYH&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0ODI5NDM1NTg4MzA2MzAxOA%3D%3D.2-ccb7-5&oh=00_AfD09C5BFdarAv0zWbmY73M8m8NAS-ss-23V4ItJMRtVaA&oe=64BC63B4&_nc_sid=10d13b"
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

    it('gets the correct post from a post containing a quote with a single image', () => {
        const postUrl = new URL(imageQuotePost._source);
        const result = buildPost(imageQuotePost, postUrl);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358252796_802168321360859_3735229788456250120_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=kkeGwtSNv4AAX9n_zkC&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfC16ZKsbeBBwK0xSKN9NWtD5paPA8U7k8SXkexuMQ8L7w&oe=64BD0268&_nc_sid=10d13b',
            username: 'ddlovato',
            caption: '🥰🥰 Thank you!!\n\n⤵️ Quoting @theattiredtaste\n\nAnd the cover art?! I’m OBSESSED. ❤️',
            likeCount: 5631,
            replyCount: 267,
            imageUrls: [
                'https://scontent.cdninstagram.com/v/t51.2885-15/360883918_1004989067180967_47617861468865567_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=BG3s05Wmu_wAX8SPvhD&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0NjcyMzUxMTA0NDU2MjMwOQ%3D%3D.2-ccb7-5&oh=00_AfAYePg2fGm8RmTQEfW-pV74PL3FUYzNHNVe_BL-lF4d8g&oe=64BDC155&_nc_sid=10d13b'
            ],
            hasImage: true,
            videoUrls: [],
            hasVideo: false,
            originalWidth: 1057,
            originalHeight: 1030,
            engagement: '💬 267&emsp;❤️ 5,631',
            description: '🥰🥰 Thank you!!\n\n⤵️ Quoting @theattiredtaste\n\nAnd the cover art?! I’m OBSESSED. ❤️\n\n💬 267&emsp;❤️ 5,631',
            url: imageQuotePost._source,
            sharedPosts: [
                {
                    profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/357838627_659632132300568_1373435018724215846_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=iDkP6qC5P8sAX9ypLHv&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDzpZc2Kbr5XNphlLV2BX5u-e5-dVVsY4WxFlb7g2bX5Q&oe=64BE6729&_nc_sid=10d13b',
                    username: 'theattiredtaste',
                    caption: 'And the cover art?! I’m OBSESSED. ❤️',
                    likeCount: 124,
                    replyCount: 10,
                    imageUrls: [
                        "https://scontent.cdninstagram.com/v/t51.2885-15/360883918_1004989067180967_47617861468865567_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=BG3s05Wmu_wAX8SPvhD&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0NjcyMzUxMTA0NDU2MjMwOQ%3D%3D.2-ccb7-5&oh=00_AfAYePg2fGm8RmTQEfW-pV74PL3FUYzNHNVe_BL-lF4d8g&oe=64BDC155&_nc_sid=10d13b"
                    ],
                    hasImage: true,
                    videoUrls: [],
                    hasVideo: false,
                    originalWidth: 1057,
                    originalHeight: 1030,
                    engagement: '💬 10&emsp;❤️ 124',
                    description: 'And the cover art?! I’m OBSESSED. ❤️\n\n💬 10&emsp;❤️ 124',
                    url: imageQuotePost._source,
                    sharedPosts: [],
                    isQuoted: true,
                    isRepost: false
                }
            ],
            isQuoted: false,
            isRepost: false
        });
    });

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

    it('gets the correct post from a post containing a quote with only text', () => {
        const postUrl = new URL(textQuotePostJson._source);
        const result = buildPost(textQuotePostJson, postUrl);

        console.log(result);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358252796_802168321360859_3735229788456250120_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=kkeGwtSNv4AAX_jWSMZ&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDaXPM8nMWtjFDikZfAgvNdDv_fO1CmXDwqsxbgrIpQCw&oe=64BD0268&_nc_sid=10d13b',
            username: 'ddlovato',
            caption: '😂😂\n\n⤵️ Quoting @caitlin_day\n\ndon’t be shy, drop the tracklist😎',
            likeCount: 1897,
            replyCount: 206,
            imageUrls: [],
            hasImage: false,
            videoUrls: [],
            hasVideo: false,
            originalWidth: 612,
            originalHeight: 612,
            engagement: '💬 206&emsp;❤️ 1,897',
            description: '😂😂\n\n⤵️ Quoting @caitlin_day\n\ndon’t be shy, drop the tracklist😎\n\n💬 206&emsp;❤️ 1,897',
            url: textQuotePostJson._source,
            sharedPosts: [
                {
                    profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/359696669_1790250578059146_5935417905375913143_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=1gWKI9ifYioAX-VzHjg&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfA3zl5W0oCz7N45ZMFGgIgFQqaxdFm4oKicvEj9rqZaHg&oe=64BEB0F8&_nc_sid=10d13b',
                    username: 'caitlin_day',
                    caption: 'don’t be shy, drop the tracklist😎',
                    likeCount: 50,
                    replyCount: 9,
                    imageUrls: [],
                    hasImage: false,
                    videoUrls: [],
                    hasVideo: false,
                    originalWidth: 612,
                    originalHeight: 612,
                    engagement: '💬 9&emsp;❤️ 50',
                    description: 'don’t be shy, drop the tracklist😎\n\n💬 9&emsp;❤️ 50',
                    url: textQuotePostJson._source,
                    sharedPosts: [],
                    isQuoted: true,
                    isRepost: false
                }
            ],
            isQuoted: false,
            isRepost: false
        });
    });

    it('gets the correct post from a post containing multiple videos', () => {
        const postUrl = new URL(videoCarouselPostJson._source);
        const result = buildPost(videoCarouselPostJson, postUrl);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358213019_186216880851983_5492715861352160006_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=FsYJCyjRr6kAX_KUNTh&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBvhrVzYEu07HJeAsXxM5R4e5_TrNDtmFC9z1krnSkUtA&oe=64BD6AF0&_nc_sid=10d13b',
            username: 'nba',
            caption: 'The Cavs go undefeated in Vegas!\n\nThey’re the NBA 2K24 Summer League champs! 🏆',
            likeCount: 2439,
            replyCount: 77,
            imageUrls: [
                "https://scontent.cdninstagram.com/v/t51.2885-15/361115691_700466285249380_8298984070928910175_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=JJSC2-8MsQQAX9zG8xz&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0OTM4NjUzNTE5NDYyMjA0NA%3D%3D.2-ccb7-5&oh=00_AfDQSVR_q6UoDN-SWgJC4MSuBoQaPELgJSBFouYkqA2RmA&oe=64BDBB06&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361392966_1486372895526414_9218186924384780060_n.jpg?stp=dst-jpg_e15_p640x640&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=rJDBMxPawfQAX_sXAaA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBal-FQ76WNXOKDKzlczlZCBPnGcbrINu2HDIgbRS0--Q&oe=64BA1B6E&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361103677_989001395850950_4179672857467046579_n.jpg?stp=dst-jpg_e15_p640x640&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=f_m09XCnKhYAX-BqCKA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDwvDFR8sRRCWEvqW2-WV1HLQSgOMDINFrVYWkPEHt6sQ&oe=64BA1AE4&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361279909_635192302121657_1887742532517945954_n.jpg?stp=dst-jpg_e15_p640x640&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=iD_n4Vqv8msAX-3oWJ3&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCkKe-UgxP774rMANdfJPcSxwLrasbVvonhxlaYbifSGg&oe=64BA42F3&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361384128_596443602672939_2845267652900936881_n.jpg?stp=dst-jpg_e15_p640x640&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=cCu3DDpe06UAX8M5HSS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfABOIUQDCIEHtlUBiwVSVHVS2TR37A8QPJEGS6ReQ95yw&oe=64BA9C68&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t51.2885-15/361184450_656039239751405_7549952016958515493_n.jpg?stp=dst-jpg_e15_p640x640&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=HljxDb60wWUAX_wBBRe&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD6svzjlnCLzazwdCBJtu0erhFecMEOzFFSiF0VzqzRjw&oe=64BA4927&_nc_sid=10d13b"
            ],
            hasImage: true,
            videoUrls: [
                "https://scontent.cdninstagram.com/v/t50.2886-16/361920504_1206750630022315_3493410980331511170_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=dJ0B2ghljkYAX9XJAw_&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBBmyAp3G1DfpKOyWG58B9tF47jDoKjuxnR1Rh74mhWVA&oe=64BA6E06&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t50.2886-16/361579782_818023446340217_8062441796634015478_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=bUYvPXG7J7AAX9bQsKa&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAv-MMEin98cgxewiMjYDNTKoNcdBYWeOIjFSbm2r_uxA&oe=64BA8D21&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t50.2886-16/361900029_318000210652307_2604069226537430229_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=1_eSu9UiR8UAX-wYhTq&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBj0hApgEAUsIXNe0wDIksxViv1K6dfx17QYtYXUG9Q9Q&oe=64BA33A0&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t50.2886-16/361910310_1485238502229503_6018028206255624232_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=FCuakjbFUsAAX-rpJST&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDQKqxcGMBemlzJFKxYPtQ8YryJnrxv6STOa0nDLK72AQ&oe=64BA3FE6&_nc_sid=10d13b",
                "https://scontent.cdninstagram.com/v/t50.2886-16/361837164_788942216227816_5382039591267100318_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=peht7crg_fMAX9xs86f&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfApPPGdMf8JHBsN8JjLkYT6EkJCvgtPU2gEsks2d3GMHQ&oe=64BA575F&_nc_sid=10d13b"
            ],
            hasVideo: true,
            originalWidth: 612,
            originalHeight: 612,
            engagement: '💬 77&emsp;❤️ 2,439',
            description: 'The Cavs go undefeated in Vegas!\n\nThey’re the NBA 2K24 Summer League champs! 🏆\n\n💬 77&emsp;❤️ 2,439',
            url: videoCarouselPostJson._source,
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
                "https://scontent.cdninstagram.com/v/t51.2885-15/361389838_987726848924849_5639668594460110207_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=tvohmhoICAUAX-8MDzz&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAn0pixWUqzIE3z8JVNQr6gJ8KylKuP6KPshwFO43QoaA&oe=64BA0CF1&_nc_sid=10d13b"
            ],
            hasImage: true,
            videoUrls: [
                "https://scontent.cdninstagram.com/v/t50.2886-16/10000000_762695492273731_9039734211839283778_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=VhocpdPCRN8AX84YOA7&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCsNSkiO0ngHcfQJQeT-gSuh-Q39G4EKzvwpRbvvMAYsw&oe=64BA0B68&_nc_sid=10d13b"
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

    it('gets the correct post from a post containing a video and a quote with a single image', () => {
        const postUrl = new URL(videoQuoteImagePostJson._source);
        const result = buildPost(videoQuoteImagePostJson, postUrl);

        console.log(result);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358213019_186216880851983_5492715861352160006_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=FsYJCyjRr6kAX_rkgi-&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDye7zYKNnoFhEAnBv8LyR8tXE0ESA9F2Q-wwzpvP7Vrg&oe=64BD6AF0&_nc_sid=10d13b',
            username: 'nba',
            caption: 'The First Teamers were SHINING in Vegas ✨\n\n⤵️ Quoting @nba\n\nThe NBA 2K24 Summer League First Team 🔥',
            likeCount: 2292,
            replyCount: 52,
            imageUrls: [
                'https://scontent.cdninstagram.com/v/t51.2885-15/360205314_2007957796221318_2024221064230554666_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=vVDHs8Rx650AX9NkjY0&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAp8wbZkMOlLKKnOlXvEnmnkxaNgCzomm8EelecOMYrvw&oe=64BAC20D&_nc_sid=10d13b',
                'https://scontent.cdninstagram.com/v/t51.2885-15/361082313_1231105807598791_1839010678019596230_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=GaJ7lFk5c30AX9CU8_O&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0OTE4MjUyODg4ODgwMjc0OQ%3D%3D.2-ccb7-5&oh=00_AfBhiK-S62FGl1kJ6lf0tLpsrtYF4u7s3zbgZxhVDHL1wg&oe=64BCF087&_nc_sid=10d13b'
            ],
            hasImage: true,
            videoUrls: [
                'https://scontent.cdninstagram.com/v/t50.2886-16/10000000_1750871975370143_2831251591199614234_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=Sz80oT1r428AX-5DQNu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfA8Xuw4W14gN9TzVZ55nfaBFpwj8SXuRpVtZhHyHkuIbQ&oe=64BA5C65&_nc_sid=10d13b'
            ],
            hasVideo: true,
            originalWidth: 1080,
            originalHeight: 1350,
            engagement: '💬 52&emsp;❤️ 2,292',
            description: 'The First Teamers were SHINING in Vegas ✨\n\n⤵️ Quoting @nba\n\nThe NBA 2K24 Summer League First Team 🔥\n\n💬 52&emsp;❤️ 2,292',
            url: videoQuoteImagePostJson._source,
            sharedPosts: [
                {
                    profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358213019_186216880851983_5492715861352160006_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=FsYJCyjRr6kAX_rkgi-&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDye7zYKNnoFhEAnBv8LyR8tXE0ESA9F2Q-wwzpvP7Vrg&oe=64BD6AF0&_nc_sid=10d13b',
                    username: 'nba',
                    caption: 'The NBA 2K24 Summer League First Team 🔥',
                    likeCount: 794,
                    replyCount: 25,
                    imageUrls: [
                        'https://scontent.cdninstagram.com/v/t51.2885-15/361082313_1231105807598791_1839010678019596230_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=GaJ7lFk5c30AX9CU8_O&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0OTE4MjUyODg4ODgwMjc0OQ%3D%3D.2-ccb7-5&oh=00_AfBhiK-S62FGl1kJ6lf0tLpsrtYF4u7s3zbgZxhVDHL1wg&oe=64BCF087&_nc_sid=10d13b'
                    ],
                    hasImage: true,
                    videoUrls: [],
                    hasVideo: false,
                    originalWidth: 1080,
                    originalHeight: 1350,
                    engagement: '💬 25&emsp;❤️ 794',
                    description: 'The NBA 2K24 Summer League First Team 🔥\n\n💬 25&emsp;❤️ 794',
                    url: videoQuoteImagePostJson._source,
                    sharedPosts: [],
                    isQuoted: true,
                    isRepost: false
                }
            ],
            isQuoted: false,
            isRepost: false
        });
    })

    it('gets the correct post from a post containing a quote with a single video', () => {
        const postUrl = new URL(videoQuotePostJson._source);
        const result = buildPost(videoQuotePostJson, postUrl);

        expect(result).toEqual({
            profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358047728_274818111888708_7050060929439619083_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=RL95IlXGvWQAX_jYGWC&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBkl-oWN_HiW2Ne9zuS3n9NGQgqG80VqrFxbJoXq6HyfQ&oe=64BC8804&_nc_sid=10d13b',
            username: 'nike',
            caption: 'Today’s the day. Who’s excited for Wemby’s NBA debut? 🙋\n\n⤵️ Quoting @nba\n\nOne more sleep until…',
            likeCount: 4830,
            replyCount: 369,
            imageUrls: [
                "https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDq8VbxSRAaDI56lXJ8aXvX6UDUO2YjoqyfnzRQ3bOOEg&oe=64BA3498&_nc_sid=10d13b",
            ],
            hasImage: true,
            videoUrls: [
                "https://scontent.cdninstagram.com/v/t50.2886-16/10000000_943161356801998_1044776441380441895_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=SppcHWTFELAAX-ZXNmt&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDqJgTi0COihzRwU9E4bBGWcEOKwPNbZH5w4A5-eejvYg&oe=64B9D9F3&_nc_sid=10d13b",
            ],
            hasVideo: true,
            originalWidth: 640,
            originalHeight: 800,
            engagement: '💬 369&emsp;❤️ 4,830',
            description: 'Today’s the day. Who’s excited for Wemby’s NBA debut? 🙋\n\n⤵️ Quoting @nba\n\nOne more sleep until…\n\n💬 369&emsp;❤️ 4,830',
            url: videoQuotePostJson._source,
            sharedPosts: [
                {
                    profilePicUrl: 'https://scontent.cdninstagram.com/v/t51.2885-19/358213019_186216880851983_5492715861352160006_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=FsYJCyjRr6kAX80poTe&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCbJd5SjbkBDQQ-uMfA6uuzB5kFwooXqgxQTMnl7Mslbg&oe=64BD6AF0&_nc_sid=10d13b',
                    username: 'nba',
                    caption: 'One more sleep until…',
                    likeCount: 17429,
                    replyCount: 801,
                    imageUrls: [
                        'https://scontent.cdninstagram.com/v/t51.2885-15/358514620_2631437670343406_2773814262600093647_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=aukYxeKIIXwAX-GjgoS&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDq8VbxSRAaDI56lXJ8aXvX6UDUO2YjoqyfnzRQ3bOOEg&oe=64BA3498&_nc_sid=10d13b'
                    ],
                    hasImage: true,
                    videoUrls: [
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
