import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {MemberService} from '../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: any[];
  membersSubscription: Subscription;

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.memberService.getMembers();
    this.membersSubscription = this.memberService.memberSubject.subscribe(
      (members: any[]) => {
        this.members = members;
      }
    );
    this.memberService.emitMemberSubject();
  }



}
