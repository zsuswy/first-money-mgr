import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

@Component({
    selector: 'app-img-upload',
    templateUrl: './img-upload.component.html',
    styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements OnInit {
    uploader: FileUploader;

    @Output()
    onFileUpload = new EventEmitter<string>();

    fileName: string;

    fileAdded = false;

    imgSrc = 'assets/img/loading.gif';

    constructor() {
        this.uploader = new FileUploader({
            url: 'http://quiz.ronmob.com/qz/file/upload',
            headers: [{name: 'Accept', value: 'application/json'}],
            autoUpload: true,
        });
        this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
        this.uploader.onAfterAddingFile = (item) => {
            this.fileAdded = true;
            console.log(item)
        };
    }

    ngOnInit() {
    }

    upload() {
        this.uploader.uploadAll();
        console.log(this.uploader);
    }

    onSuccessItem(item, response, status, headers) {
        if (status == 200) {
            this.fileName = JSON.parse(response).link;
            this.onFileUpload.emit(this.fileName);
            this.imgSrc = this.fileName;
        }
        // console.log(item);
        // console.log(response);
        // console.log(status);
        // console.log(headers);
    }
}
