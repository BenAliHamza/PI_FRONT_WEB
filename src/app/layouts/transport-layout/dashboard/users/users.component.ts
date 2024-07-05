import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../../services/user.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "../../../../interfaces/user.interface";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  pages: number[] = [];
  totalPages: number = 0;

  selectedSex: string = '';
  selectedRole: string = '';
  selectedStatus: string = '';
  searchText: string = '';

  STATUS_ARRAY = ['PENDING', 'APPROVED', 'REJECTED', 'BANNED'];
  ROLE_ARRAY = ['DEFAULT', 'VENDEUR', 'TAXI', 'GUEST', 'ADMIN'];
  sexs = ['male', 'female'];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.userService.getall().subscribe((response: any) => {
      this.users = response.users;
      this.filterUsers();
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.spinner.hide();
    });
  }

  changePage(page: number): void {
    if (page < 1) {
      page = 1;
    } else if (page > this.totalPages) {
      page = this.totalPages;
    }
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
    console.log('Paginated Users:', this.paginatedUsers);
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      return (!this.selectedSex || user.sex === this.selectedSex) &&
        (!this.selectedRole || user.role === this.selectedRole) &&
        (!this.selectedStatus || user.status === this.selectedStatus) &&
        (!this.searchText || user.firstname.toLowerCase().includes(this.searchText.toLowerCase()));
    });
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);
    console.log('Filtered Users:', this.filteredUsers);
    console.log('Paginated Users after filter:', this.paginatedUsers);
  }
}
