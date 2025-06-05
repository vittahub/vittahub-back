import { BaseRepository } from "./BaseRepository";

export abstract class UserBoundRepository<T> extends BaseRepository<T> {
  async findByUserId(user_id: number): Promise<T | null> {
    const row = await this.db(this.table)
      .where({ user_id })
      .first();
    return row ?? null;
  }
}