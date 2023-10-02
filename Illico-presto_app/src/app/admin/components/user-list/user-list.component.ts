import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Observable} from "rxjs";
import {User} from "../../../models/User.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{

  users$! :Observable<User[]>;
  usersData = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'email', 'roles', 'showUser'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems = 0;
  userEditId: number | null = null;

  constructor(private usersService : UsersService, private router : Router) {
  }
  ngOnInit(): void {
    this.users$ = this.usersService.getAllUsers();
    console.log(this.users$)
    this.users$.subscribe(users => {
      this.usersData.data = users;
    });
    console.log(this.usersData);
    this.getUsers();
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.usersData.filter = filterValue.trim().toLowerCase();
  }
  transformRoles(roles: string[]): string {
    const roleMapping: { [key: string]: string } = {
      'ROLE_SERVER': 'Server',
      'ROLE_ADMIN': 'Admin',
      'ROLE_KITCHEN': 'Kitchen',

    };

    return roles.map(role => roleMapping[role] || role).join(', ');
  }
  getUsers() {
    this.usersService.getAllUsers().subscribe((data) => {
      // Stockez toutes les données dans dataSource.data
      this.usersData.data = data;
      // Lier le dataSource à la pagination
      this.usersData.paginator = this.paginator;
    });
  }


  showUser(id: number) {
    this.router.navigateByUrl(`/admin/users/${id}`);
  }
}
