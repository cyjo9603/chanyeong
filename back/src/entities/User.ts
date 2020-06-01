import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';

const BCRYPT_SALT = 10 as const;

enum UserLevel {
  ADMIN = 'ADMIN',
}

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: 'enum', enum: UserLevel, default: UserLevel.ADMIN })
  level!: UserLevel;

  @Column({ type: 'varchar', length: 20 })
  userId!: string;

  @Column({ type: 'varchar', length: 200 })
  password!: string;

  @Column({ type: 'varchar', length: 15 })
  familyName!: string;

  @Column({ type: 'varchar', length: 20 })
  givenName!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  refreshToken?: string;

  /** password hash
   *  비밀번호 삽입 및 변경 시
   *  해쉬값으로 변경한 뒤 저장
   */
  hashPassword(password: string) {
    return bcrypt.hash(password, BCRYPT_SALT);
  }

  public comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword() {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }
}

export default User;
