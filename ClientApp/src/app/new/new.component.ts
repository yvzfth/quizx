import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import { HttpClient } from '@angular/common/http';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
export interface Flashcard {
  index: number;
  front: string;
  back: string;
  showBack?: boolean;
}

export interface Collection {
  id?: number;
  name: string;
  flashcards: Flashcard[];
  userEmail?: string;
}
const collectionInitialData = {
  name: '',
  flashcards: [],
};

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  @Output() createCollection: EventEmitter<any> = new EventEmitter();
  collectionName: string = '';
  flashcards: Flashcard[] = [];
  editingFlashcard!: Flashcard | null; // Declare editingFlashcard property
  originalFlashcard!: Flashcard | null;
  collectionData: Collection = collectionInitialData;
  fullName!: string;
  email!: string;
  constructor(
    private router: Router,
    private collection: CollectionService,
    private http: HttpClient,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
    this.userStore.getEmailFromStore().subscribe((val) => {
      const emailFromToken = this.auth.getEmailFromToken();
      this.email = val || emailFromToken;
    });
  }

  addFlashcard(front: string, back: string): void {
    const flashcard: Flashcard = {
      index: this.flashcards.length + 1,
      front,
      back,
    };
    this.flashcards.push(flashcard);
  }

  deleteFlashcard(index: number): void {
    this.flashcards = this.flashcards.filter(
      (flashcard) => flashcard.index !== index
    );
  }

  editFlashcard(index: number): void {
    this.editingFlashcard = this.flashcards.find(
      (flashcard) => flashcard.index === index
    )!; // Set the editingFlashcard property
    this.originalFlashcard = { ...this.editingFlashcard }; // Create a copy of the original flashcard
  }

  updateFlashcard(index: number, front: string, back: string): void {
    const flashcard = this.flashcards.find(
      (flashcard) => flashcard.index === index
    );
    if (flashcard) {
      flashcard.front = front;
      flashcard.back = back;
    }
    this.editingFlashcard = null; // Reset the editingFlashcard property
  }

  cancelEdit() {
    if (this.editingFlashcard) {
      // Restore the original flashcard values
      Object.assign(this.editingFlashcard, this.originalFlashcard);
      this.editingFlashcard = null;
      this.originalFlashcard = null;
    }
  }

  // Define a method to handle the form submission
  onSubmit() {
    this.collectionData.name = this.collectionName;
    this.collectionData.flashcards = this.flashcards;
    this.collectionData.userEmail = this.email;
    console.log(this.collectionData);
    // Emit the createCollection event with the new collection data
    this.collection.createCollection(this.collectionData).subscribe({
      next: (res) => {
        console.log(res.message);
        this.collectionData = collectionInitialData;
        this.router.navigate(['/dashboard']);
        alert(res.message);
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }
}
