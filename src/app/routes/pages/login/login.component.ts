import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    public loginData: any = {};
    public resData: any = {};
    public emailNotExist_isHidden: Boolean = true;
    public passwordNotMatch_isHidden: Boolean = true;

    constructor(public settings: SettingsService, fb: FormBuilder, private api: ApiService, private router: Router) {

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            this.loginData.email = value.email;
            this.loginData.password = value.password;
            
            this.api.sendApiRequest('users/login',this.loginData)
            .subscribe(data => {
                console.log(data);
                this.resData = data;    
                if (this.resData.result_code == "157"){
                    this.emailNotExist_isHidden = false;
                    this.passwordNotMatch_isHidden = true;
                } else if (this.resData.result_code == "158"){
                    this.emailNotExist_isHidden = true;
                    this.passwordNotMatch_isHidden = false;
                } else if (this.resData.result_code == "160"){
                    localStorage.setItem("token",this.resData.data.token);
                    localStorage.setItem("user_id",this.resData.data.id);
                    this.router.navigate(['/', 'home']);
                }
            });
        }
    }

    ngOnInit() {

    }

    public emailClick(){
        this.passwordNotMatch_isHidden = true;
        this.emailNotExist_isHidden = true;
    }

    public passwordClick(){
        this.passwordNotMatch_isHidden = true;
        this.emailNotExist_isHidden = true;
    }

}
