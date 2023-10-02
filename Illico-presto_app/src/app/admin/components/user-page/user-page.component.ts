import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../../models/User.model";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
  user !: User;
  userEdit : boolean = false;
  userForm! : FormGroup;
  roleMappings: { label: string, value: string }[] = [
    { label: 'Admin', value: 'ROLE_ADMIN' },
    { label: 'Server', value: 'ROLE_SERVER' },
    { label: 'Kitchen', value: 'ROLE_KITCHEN' },

  ];
  constructor(private usersService : UsersService, private route : ActivatedRoute, private fb : FormBuilder) {}
  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    const userId = +params.get('id')!;
    console.log(userId);
    this.usersService.getUserById(userId).subscribe(user=>{
      if (user){
        this.user = user;
        console.log("user : " + this.user);
      }
    });
    this.userForm = this.fb.group({
      lastName : [''],
      firstName : [''],
      email : [''],
      roles: [[]]
    })

  }

  starEdit() {
    this.userForm.patchValue({
      lastName : this.user.lastName,
      firstName : this.user.firstName,
      email : this.user.email,
      roles : [this.user.roles]
    })
    this.userEdit=true;


  }


  updateUser() {
    if(this.user != null){
      const userData = {
        lastName : this.userForm.get('lastName')?.value,
        firstName : this.userForm.get('firstName')?.value,
        email : this.userForm.get('email')?.value,
        roles : [this.userForm.get('roles')?.value]
      }
      console.log(this.userForm.value);
      this.usersService.updateUser(this.user.id, userData).subscribe(()=>{
        this.userEdit = false;
        if(this.user.id != null){
          this.usersService.getUserById(this.user.id).subscribe(user=>{
            if (user){
              this.user = user;
              console.log("user : " + this.user);
            }
          });
        }

      }, (error)=>{
        console.log("la mise a jour a échoué : " + error)
      });
    }

  }
}
