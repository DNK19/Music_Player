const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: [
        {
            name: 'Waiting for you',
            singer: 'Mono',
            path: './assets/music/Waiting-for-you.mp3',
            img: '../assets/img/mono-1.jpg',
        },
        {
            name: 'Em là',
            singer: 'Mono',
            path: '../assets/music/Em-la.mp3',
            img: '../assets/img/mono-2.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
        { 
            name: 'Chung ta cua hien tai',
            singer: 'Son Tung MTP',
            path: '../assets/music/CTCHT.mp3',
            img: '../assets/img/sontung-1.jpg',
        },
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb" 
                        style="background-image: url('${song.img}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    handleEvents: function() {
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
    },
    start: function(){
        this.handleEvents();
        this.render();
    }

}
app.start();
