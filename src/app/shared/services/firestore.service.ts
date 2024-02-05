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
import { Observable, tap } from 'rxjs';
import { CosasType, Photo } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
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
    const q = query(this.coleccion, where('type', '==', type));

    // Fetching data from Firestore using the created query and explicitly defining the type
    return collectionData<any>(q, { idField: 'id' }) as Observable<Array<any>>;
  }

  addPhoto(photo: Photo): Promise<DocumentReference<any>> {
    const col = collection(this.firestore, 'photos');

    return addDoc(col, photo);
  }

  deletePhoto(id: string): Promise<void> {
    const documento = doc(this.coleccion, id);
    return deleteDoc(documento);
  }

  updatePhoto(usuario: any): Promise<void> {
    const documento = doc(this.coleccion, usuario.id);
    return updateDoc(documento, {
      ...usuario,
    });
  }
}
