export interface IBaseRepository<T> {
    create(data: Omit<T, 'id'>): Promise<T>;
    find(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: number, data: Partial<Omit<T, 'id'>>): Promise<T>;
    delete(id: number): Promise<boolean>;
}