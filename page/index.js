new Vue({
    el: '#app',
    data: {
        key: "ssd",
        imgSrc: "",
        isShow: false,
        result: "",
        loading: false,
        init: true,
        upload_file: null
        // file:""
    },
    methods: {
        upload() {
            var self = this;
            this.loading = true;
            this.init = false;
            var file = document.getElementById("file");
            var upload_file = file.files[0],
                formdata = new FormData(),
                xhr = new XMLHttpRequest();

            formdata.append('date', new Date().toLocaleString());
            // 将文件添加到formdata对象中，（注：下面的file字段名在node中有用）
            formdata.append('file', upload_file);
            xhr.open("POST", "/upload", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var res = JSON.parse(xhr.responseText);
                    console.log(res);
                    self.imgSrc = res.imgUrl;
                    self.result = res.animalRes.keyword;
                    self.isShow = true;
                    self.loading = false;
                    self.init = false;
                    // console.log(xhr.responseText)
                }
            };
            xhr.send(formdata);

        },
        clear() {
            this.isShow = false;
            this.loading = false;
            this.init = true
        },
        allowDrag(e) {
            e.preventDefault();
        },
        drop(e) {
            e.preventDefault();
            var self = this;
            this.loading = true;
            this.init = false;
            var upload_file = e.dataTransfer.files[0],
                formdata = new FormData(),
                xhr = new XMLHttpRequest();

            formdata.append('date', new Date().toLocaleString());
            // 将文件添加到formdata对象中，（注：下面的file字段名在node中有用）
            formdata.append('file', upload_file);
            xhr.open("POST", "/upload", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var res = JSON.parse(xhr.responseText)
                    console.log(res)
                    self.imgSrc = res.imgUrl;
                    self.result = res.animalRes.result;
                    self.isShow = true;
                    self.loading = false;
                    self.init = false;
                    // console.log(xhr.responseText)
                }
            };
            xhr.send(formdata);
        }

    }
});