import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from '@angular/fire/firestore';

// Define an interface for the like document data
interface LikeData {
  userId: string;
  photoId: string;
  isDeleted?: boolean;
  timestamp?: any;
}

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private likesCollection: any;

  constructor(private firestore: Firestore) {
    this.likesCollection = collection(this.firestore, 'likes');
  }

  async addLike(userEmail: string, photoId: string): Promise<void> {
    // Check if the user has already liked the photo
    const querySnapshot = await getDocs(
      query(
        this.likesCollection,
        where('userEmail', '==', userEmail),
        where('photoId', '==', photoId)
      )
    );

    if (querySnapshot.size === 0) {
      // User has not liked the photo yet
      await addDoc(this.likesCollection, {
        userEmail,
        photoId,
        timestamp: serverTimestamp(),
      });
    } else {
      // User has already liked the photo
      throw new Error('User has already liked this photo.');
    }
  }

  async removeLike(userId: string, photoId: string): Promise<void> {
    // Find the like document
    const querySnapshot = await getDocs(
      query(
        this.likesCollection,
        where('userId', '==', userId),
        where('photoId', '==', photoId)
      )
    );

    if (querySnapshot.size > 0) {
      // Remove the like document
      const likeDoc = doc(this.likesCollection, querySnapshot.docs[0].id);
      await updateDoc(likeDoc, {
        isDeleted: true,
        timestamp: serverTimestamp(),
      });
    }
  }

  async getUserLikes(userId: string): Promise<string[]> {
    const userLikes = await getDocs(
      query(
        this.likesCollection,
        where('userId', '==', userId),
        where('isDeleted', '!=', true)
      )
    );
    return userLikes.docs.map((doc) => (doc.data() as LikeData).photoId);
  }
}
