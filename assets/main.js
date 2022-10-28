const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "./assets/music/Waiting-for-you.mp3",
      img: "./assets/img/mono-1.jpg",
    },
    {
      name: "Em là",
      singer: "Mono",
      path: "./assets/music/Em-la.mp3",
      img: "./assets/img/mono-2.jpg",
    },
    {
      name: "Chúng ta của hiện tại",
      singer: "Sơn Tùng MTP",
      path: "./assets/music/CTCHT.mp3",
      img: "./assets/img/sontung-1.jpg",
    },
    {
      name: "Âm thầm bên em",
      singer: "Sơn Tùng MTP",
      path: "./assets/music/ATBE.mp3",
      img: "./assets/img/sontung-2.jpg",
    },
    {
      name: "Bông hoa đẹp nhất",
      singer: "Quân AP",
      path: "./assets/music/BHDN.mp3",
      img: "./assets/img/QuanAP.jpg",
    },
    {
      name: "Chuyện đôi ta",
      singer: "DalaB",
      path: "./assets/music/CDT.mp3",
      img: "./assets/img/CDT.jpg",
    },
    {
      name: "Anh chưa thương em đến vậy đâu",
      singer: "Lady Mây",
      path: "./assets/music/ACTEDVD.mp3",
      img: "./assets/img/Actedvd-7.jpg",
    },
    {
      name: "Chung ta cua hien tai",
      singer: "Son Tung MTP",
      path: "./assets/music/CTCHT.mp3",
      img: "./assets/img/sontung-1.jpg",
    },
    {
      name: "Chung ta cua hien tai",
      singer: "Son Tung MTP",
      path: "./assets/music/CTCHT.mp3",
      img: "./assets/img/sontung-1.jpg",
    },
    {
      name: "Chung ta cua hien tai",
      singer: "Son Tung MTP",
      path: "./assets/music/CTCHT.mp3",
      img: "./assets/img/sontung-1.jpg",
    },
    {
      name: "Chung ta cua hien tai",
      singer: "Son Tung MTP",
      path: "./assets/music/CTCHT.mp3",
      img: "./assets/img/sontung-1.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                <div class="song ${
                  index === this.currentIndex ? "active" : ""
                }" data-index = "${index}">
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
            `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;
    const _this = this;
    //Xử lý quay tròn image
    const cdThumbAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );

    cdThumbAnimate.pause();

    //Xử lý phóng to/thu nhỏ cd
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    //Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    //khi chạy bài hát
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    //khi ngưng bài hát
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    //chạy theo tiến độ bài hát
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    //xử lý khi tua - fix lỗi onchange bị ảnh hưởng bởi ontimeupdate, đổi thành
    // oninput dễ dàng bắt sự kiện nhanh khi có sự thay đổi xảy ra
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    //khi next bài hát
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //khi prev bài hát
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //random bài hát xử lý bật tắt
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    //Xử lý lặp bài hát
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    //Xử lý random hết mảng từng bài xong clear bắt đầu lại mảng mới
    //đưa hết các bài đã random vào mảng và kiểm tra nếu đã lặp qua
    //thì đổi sang bài mới

    //Xử lý next bài hát khi kết thúc bài hát
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    //Lắng nghe click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      const optionNode = e.target.closest(".option");

      if (songNode || optionNode) {
        //Xử lý click vào song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          //dataset.index convert thành chuỗi
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }

        //Xử lý khi click vào option
        if (optionNode) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    //Gán cáu hình từ config vào object app
    this.loadConfig();

    //Định nghĩa các thuộc tính object
    this.defineProperties();

    //Lắng nghe xử lý các sự kiện
    this.handleEvents();

    //Tải thông tin bài hát đầu tiên vào UI khi chạy
    this.loadCurrentSong();

    //Render playlist
    this.render();

    //Hiển thị trạng thái ban đầu của button repeat và random
    repeatBtn.classList.toggle("active", _this.isRepeat);
    randomBtn.classList.toggle("active", _this.isRandom);
  },
};
app.start();
