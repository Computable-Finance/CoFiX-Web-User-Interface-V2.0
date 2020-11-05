import { Subscription } from 'rxjs';

export interface CoinContent {
  id: string;
  address: string;
  amount: string;
  isApproved: boolean;
  balance: string;
  subscription?: Subscription;
}
