import { AuthorListComponent } from './author-list.component'; // Adjust path as needed
import { AuthorService } from '../../../core/services/author.service'; // Adjust path as needed
import { Author } from '../../../shared/models/author.model'; // Adjust path as needed

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let mockAuthorService: jest.Mocked<AuthorService>;

  // Sample author data for testing
  const MOCK_AUTHORS: Author[] = [
    { id: '1', name: 'Zoe Author', bio: 'A short bio for Zoe.', createdAt: '2023-01-15T10:00:00Z' },
    { id: '2', name: 'Alice Author', bio: 'This is a very long biography that definitely exceeds the 150 character limit set for truncation. It should be cut off at precisely 150 characters and append an ellipsis at the end to indicate that there is more content.', createdAt: '2022-03-01T12:30:00Z' },
    { id: '3', name: 'Bob Author', bio: 'Another bio here.', createdAt: '2023-05-20T08:00:00Z' },
    { id: '4', name: 'Charlie Writer', bio: 'Writer by profession.', createdAt: '2021-11-10T14:00:00Z' },
  ];

  beforeEach(() => {
    // Create a mock AuthorService with jest.fn() for methods.
    // We only need to mock the public methods that AuthorListComponent uses.
    // Private properties (like firebase, authorCollection, userCollection) should not be mocked directly
    // unless the test *specifically* needs to interact with them via public methods that expose them,
    // which is not the case for AuthorListComponent's current functionality.
    mockAuthorService = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      // If AuthorService had other public methods or properties that are used by AuthorListComponent,
      // they would be added here as jest.fn() or mock values.
    } as any as jest.Mocked<AuthorService>; // Cast to 'any' first, then to Mocked<AuthorService>
                                             // This bypasses strict private property checks during mocking.

    // Initialize the component with the mocked service
    component = new AuthorListComponent(mockAuthorService);
  });

  // Test suite for ngOnInit
  describe('ngOnInit', () => {
    it('should fetch authors and set properties on successful API call', async () => {
      // Mock the getAll method to return sample authors
      mockAuthorService.getAll.mockResolvedValue(MOCK_AUTHORS);

      // Call ngOnInit
      await component.ngOnInit();

      // Assertions
      expect(component.loading).toBe(false); // Loading should be false after completion
      expect(component.error).toBeNull();    // No error should be present
      expect(component.authors).toEqual(MOCK_AUTHORS); // authors should be set
      expect(component.filteredAuthors).toEqual(MOCK_AUTHORS.sort((a, b) => a.name.localeCompare(b.name))); // filteredAuthors should be sorted by default
      expect(mockAuthorService.getAll).toHaveBeenCalledTimes(1); // getAll should have been called once
    });

    it('should handle errors during API call and set error message', async () => {
      const errorMessage = 'Network error';
      // Mock the getAll method to reject with an error
      mockAuthorService.getAll.mockRejectedValue(new Error(errorMessage));

      // Spy on console.error to check if it's called
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Call ngOnInit
      await component.ngOnInit();

      // Assertions
      expect(component.loading).toBe(false); // Loading should be false after completion
      expect(component.error).toBe('Failed to load authors. Please try again later.'); // Error message should be set
      expect(component.authors).toEqual([]); // authors should be an empty array on error
      expect(component.filteredAuthors).toEqual([]); // filteredAuthors should also be empty
      expect(mockAuthorService.getAll).toHaveBeenCalledTimes(1); // getAll should still have been called once
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching authors:', expect.any(Error)); // Console error should be logged

      // Restore the original console.error function
      consoleErrorSpy.mockRestore();
    });

    it('should set loading to true before fetching and false after', async () => {
      // Create a promise that resolves after a short delay to simulate async operation
      const pendingPromise = new Promise<Author[]>(resolve => setTimeout(() => resolve(MOCK_AUTHORS), 50));
      mockAuthorService.getAll.mockReturnValue(pendingPromise);

      // Call ngOnInit without awaiting to check immediate loading state
      const ngOnInitPromise = component.ngOnInit();

      // Assert loading is true right after calling
      expect(component.loading).toBe(true);

      // Await the completion of ngOnInit
      await ngOnInitPromise;

      // Assert loading is false after completion
      expect(component.loading).toBe(false);
    });
  });

  // Test suite for getTruncatedBio
  describe('getTruncatedBio', () => {
    it('should return an empty string if bio is undefined', () => {
      expect(component.getTruncatedBio(undefined)).toBe('');
    });

    it('should return an empty string if bio is null', () => {
      // Although bio?: string means it can be undefined or string,
      // it's good to explicitly test for null if it could possibly be passed.
      expect(component.getTruncatedBio(null as any)).toBe('');
    });

    it('should return an empty string if bio is an empty string', () => {
      expect(component.getTruncatedBio('')).toBe('');
    });
  });

  // Test suite for applyFilters
  describe('applyFilters', () => {
    beforeEach(() => {
      // Initialize authors for filtering and sorting tests
      component.authors = [...MOCK_AUTHORS];
    });

    it('should filter authors by filterTerm (case-insensitive)', () => {
      component.filterTerm = 'author';
      component.applyFilters();
      expect(component.filteredAuthors.length).toBe(3); // Zoe, Alice, Bob
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['Alice Author', 'Bob Author', 'Zoe Author']); // Sorted by default
    });

    it('should filter authors by filterTerm with partial match', () => {
      component.filterTerm = 'zoe';
      component.applyFilters();
      expect(component.filteredAuthors.length).toBe(1);
      expect(component.filteredAuthors[0].name).toBe('Zoe Author');
    });

    it('should return all authors if filterTerm is empty', () => {
      component.filterTerm = '';
      component.applyFilters();
      // Expect default sort (name-asc)
      expect(component.filteredAuthors.length).toBe(MOCK_AUTHORS.length);
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['Alice Author', 'Bob Author', 'Charlie Writer', 'Zoe Author']);
    });

    it('should sort authors by name in ascending order (name-asc)', () => {
      component.sortOption = 'name-asc';
      component.applyFilters();
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['Alice Author', 'Bob Author', 'Charlie Writer', 'Zoe Author']);
    });

    it('should sort authors by name in descending order (name-desc)', () => {
      component.sortOption = 'name-desc';
      component.applyFilters();
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['Zoe Author', 'Charlie Writer', 'Bob Author', 'Alice Author']);
    });

    it('should sort authors by date in newest first order (date-newest)', () => {
      component.sortOption = 'date-newest';
      component.applyFilters();
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['Bob Author', 'Zoe Author', 'Alice Author', 'Charlie Writer']);
    });

    it('should sort authors by date in oldest first order (date-oldest)', () => {
      component.sortOption = 'date-oldest';
      component.applyFilters();
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['Charlie Writer', 'Alice Author', 'Zoe Author', 'Bob Author']);
    });

    it('should combine filtering and sorting', () => {
      component.filterTerm = 'author'; // Filters Zoe, Alice, Bob
      component.sortOption = 'date-newest'; // Sorts them by date newest first
      component.applyFilters();
      expect(component.filteredAuthors.length).toBe(3);
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['Bob Author', 'Zoe Author', 'Alice Author']);
    });

    it('should handle sorting when createdAt is missing for some authors', () => {
      const authorsWithMissingDate: Author[] = [
        { id: '5', name: 'David Smith', bio: 'Bio 5' }, // No createdAt
        { id: '6', name: 'Eve Brown', bio: 'Bio 6', createdAt: '2024-01-01T00:00:00Z' },
        { id: '7', name: 'Frank Green', bio: 'Bio 7', createdAt: '2023-07-01T00:00:00Z' },
      ];
      component.authors = authorsWithMissingDate;

      component.sortOption = 'date-newest';
      component.applyFilters();
      // Authors with no date (0 timestamp) should come after those with dates when sorting newest first
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['Eve Brown', 'Frank Green', 'David Smith']);

      component.sortOption = 'date-oldest';
      component.applyFilters();
      // Authors with no date (0 timestamp) should come before those with dates when sorting oldest first
      expect(component.filteredAuthors.map(a => a.name)).toEqual(['David Smith', 'Frank Green', 'Eve Brown']);
    });

    it('should handle empty authors array gracefully', () => {
      component.authors = [];
      component.filterTerm = 'test';
      component.sortOption = 'name-asc';
      component.applyFilters();
      expect(component.filteredAuthors).toEqual([]);
    });
  });
});
