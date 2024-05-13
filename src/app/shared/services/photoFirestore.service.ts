import { Injectable } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  query,
  where,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CosasType, Photo } from '../interfaces/photo.interface';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class photoFirestoreService {
  private coleccion: any;

  constructor(private firestore: Firestore) {
    this.coleccion = collection(this.firestore, 'photos');
  }

  getUsuariosPorRol(rol: string): Observable<Array<any>> {
    const q = query(this.coleccion, where('rol', '==', rol));

    // Fetching data from Firestore using the created query and explicitly defining the type
    return collectionData<any>(q, { idField: 'id' }) as Observable<Array<any>>;
  }

  getPhotosByType(type: CosasType): Observable<Array<Photo>> {
    // Create the query with the type filter and order by timestamp descending
    const q = query(this.coleccion, where('type', '==', type), orderBy('timestamp', 'desc'));

    // Fetch data with explicit type definition
    return collectionData<any>(q, { idField: 'id' }) as Observable<Array<Photo>>;
  }
  addPhoto(photo: Photo): Promise<DocumentReference<any>> {
    // const col = collection(this.firestore, 'photos');

    return addDoc(this.coleccion, photo);
  }

  deletePhoto(id: string): Promise<void> {
    const document = doc(this.coleccion, id);
    return deleteDoc(document);
  }

  updatePhoto(photo: Photo): Promise<void> {
    const document = doc(this.coleccion, photo.id);
    return updateDoc(document, {
      ...photo,
    });
  }
}
