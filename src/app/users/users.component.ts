import { Component, OnInit } from '@angular/core';
import { DataService, User, UserAddress } from "../app.data.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private users: User[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  getAddress(address: UserAddress): string {
    return address.city + ', ' + address.street + ', ' + address.suite + ', ' + address.zipcode
  }
}
