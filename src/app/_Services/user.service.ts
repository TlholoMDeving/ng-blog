import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { IProfileUser } from '../_Interfaces/profile-user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}
  get currentUserProfile$(): Observable<IProfileUser | undefined> {
    return this.firestore
      .collection('users-collection')
      .doc<IProfileUser>(this.authService.currentUserId!)
      .valueChanges();
  }

  addUser(user: IProfileUser) {
    return from(this.firestore.collection('users-collection').add(user));
  }

  updateUser(user: Partial<IProfileUser>, id: string): Observable<void> {
    return from(
      this.firestore
        .collection('users-collection')
        .doc(id)
        .update({
          ...user,
        })
    );
  }
}
