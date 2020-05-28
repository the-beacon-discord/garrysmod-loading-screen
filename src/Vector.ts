class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;  
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y)
  }

  sub(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y)
  }

  portion(amount: number): Vector {
    return new Vector(this.x * amount, this.y * amount)
  }

  tan(): number {
    return Math.atan2(this.y, this.x)
  }
}

export { Vector }
