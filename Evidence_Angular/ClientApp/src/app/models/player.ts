export class Player {
  constructor(
    public playerId?: number,
    public playerName?: string,
    public playerCategory?: string,
    public joinDate?: Date,
    public gender?: string,
    public picture?: string,
    public sportId?: number
  ) { }
}
