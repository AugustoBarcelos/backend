import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises'; 

@Injectable()
export class UserService {
  private users: any[] = [];

  constructor() {
    this.loadUsers();
  }

  private async loadUsers() {
    try {
      const data = await readFile('user.json', 'utf-8');
      this.users = JSON.parse(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }
}
