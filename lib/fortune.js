const fortunes = [
    "Pobedi svoi straxi, ili oni pobedat tebya",
    "Rekam nujn@ istoki",
    "asdasfasdfasdf asdfas dfasdf",
    "qwerwer wqre qwer qwr wqerweqw erqwer",
    "zxcv zxcvxcvdsfzxcv zxcvrdvzxc zxv"
];

exports.getFortune = () => {
    const indx = Math.floor(Math.random() * fortunes.length);
    return fortunes[indx];
};
