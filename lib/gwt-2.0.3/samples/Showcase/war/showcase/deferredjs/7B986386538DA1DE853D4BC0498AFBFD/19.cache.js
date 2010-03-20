function w$(){}
function HIb(){}
function cJb(){}
function fJb(){}
function kJb(){}
function _Ib(){return tR}
function I$(){return ZL}
function eJb(){return qR}
function jJb(){return rR}
function mJb(){return sR}
function aJb(a){TIb(this,a)}
function ZIb(a){if(a==KIb){return true}FE();return a==JIb}
function YIb(a){if(a==LIb){return true}FE();return a==OIb}
function RIb(a){PIb();gDb(a);a.c=(GLb(),DLb);a.d=(RLb(),QLb);a.f[$fc]=0;a.f[Zfc]=0;return a}
function iJb(a,b){a.c=(GLb(),DLb).b;a.e=(RLb(),QLb).b;a.b=b;return a}
function VIb(a,b){var c;c=a.I;c.c=b.b;!!c.d&&(c.d[hgc]=b.b,undefined)}
function WIb(a,b){var c;c=a.I;c.e=b.b;!!c.d&&(c.d.style[rmc]=b.b,undefined)}
function PIb(){PIb=Cbc;IIb=new cJb;LIb=new cJb;KIb=new cJb;JIb=new cJb;MIb=new cJb;NIb=new cJb;OIb=new cJb}
function bJb(a){var b;b=oCb(this,a);if(b){a==this.b&&(this.b=null);UIb(this)}return b}
function J$(){E$=true;D$=(G$(),new w$);Un((Rn(),Qn),19);!!$stats&&$stats(zo(eGc,edc,null,null));D$.Hb();!!$stats&&$stats(zo(eGc,Avc,null,null))}
function M$(){var a,b,c,d;while(B$){a=B$;B$=B$.c;!B$&&(C$=null);xdb(a.b.b,(c=RIb(new HIb),c.K[Nfc]=fGc,c.f[$fc]=4,c.c=(GLb(),CLb),SIb(c,GHb(new vHb,gGc),(PIb(),MIb)),SIb(c,GHb(new vHb,hGc),NIb),SIb(c,GHb(new vHb,iGc),JIb),SIb(c,GHb(new vHb,jGc),OIb),SIb(c,GHb(new vHb,kGc),MIb),SIb(c,GHb(new vHb,lGc),NIb),b=GHb(new vHb,mGc),d=aTb(new ZSb,b),d.K.style[Sfc]=nGc,d.K.style[Ofc]=oGc,SIb(c,d,IIb),TIb(c,pGc),c))}}
function SIb(a,b,c){var d;if(c==IIb){if(b==a.b){return}else if(a.b){throw t2b(new q2b,qGc)}}Abb(b);TXb(a.g,b);c==IIb&&(a.b=b);d=iJb(new fJb,c);b.I=d;VIb(b,a.c);WIb(b,a.d);UIb(a);Cbb(b,a)}
function UIb(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q;b=a.e;while(gBb(b)>0){b.removeChild(fBb(b,0))}n=1;e=1;for(h=dYb(new aYb,a.g);h.b<h.c.d-1;){d=fYb(h);f=d.I.b;f==MIb||f==NIb?++n:(f==JIb||f==OIb||f==LIb||f==KIb)&&++e}o=SI(ZU,348,31,n,0);for(g=0;g<n;++g){o[g]=new kJb;o[g].c=(dq(),$doc).createElement(Ylc);b.appendChild(o[g].c)}j=0;k=e-1;l=0;p=n-1;c=null;for(h=dYb(new aYb,a.g);h.b<h.c.d-1;){d=fYb(h);i=d.I;q=(dq(),$doc).createElement(Wlc);i.d=q;i.d[hgc]=i.c;i.d.style[rmc]=i.e;i.d[Sfc]=Ucc;i.d[Ofc]=Ucc;if(i.b==MIb){jBb(o[l].c,q,o[l].b);q.appendChild(d.K);q[bgc]=k-j+1;++l}else if(i.b==NIb){jBb(o[p].c,q,o[p].b);q.appendChild(d.K);q[bgc]=k-j+1;--p}else if(i.b==IIb){c=q}else if(YIb(i.b)){m=o[l];jBb(m.c,q,m.b++);q.appendChild(d.K);q[rGc]=p-l+1;++j}else if(ZIb(i.b)){m=o[l];jBb(m.c,q,m.b);q.appendChild(d.K);q[rGc]=p-l+1;--k}}if(a.b){m=o[l];jBb(m.c,c,m.b);c.appendChild(a.b.K)}}
function TIb(a,b){var c,d,e,f,g,h,i;cXb(a.K,Ucc,b);h=q9b(new o9b);i=dYb(new aYb,a.g);while(i.b<i.c.d-1){c=fYb(i);g=c.I.b;e=gJ(h.mb(g),40);d=!e?1:e.b;f=$Ib(g,d);cXb(Zyb(c.K),b,f);h.nb(g,S2b(d+1))}}
function $Ib(a,b){if(a==MIb){return sGc+b}else if(a==NIb){return tGc+b}else if(a==OIb){return uGc+b}else if(a==JIb){return vGc+b}else if(a==LIb){return wGc+b}else if(a==KIb){return xGc+b}else{return smc}}
var oGc='100px',yGc='AsyncLoader19',BGc='DockPanel',CGc='DockPanel$DockLayoutConstant',DGc='DockPanel$LayoutData',zGc='DockPanel$TmpRow',AGc='DockPanel$TmpRow;',qGc='Only one CENTER widget may be added',mGc="This is a <code>ScrollPanel<\/code> contained at the center of a <code>DockPanel<\/code>.  By putting some fairly large contents in the middle and setting its size explicitly, it becomes a scrollable area within the page, but without requiring the use of an IFRAME.<br><br>Here's quite a bit more meaningless text that will serve primarily to make this thing scroll off the bottom of its visible area.  Otherwise, you might have to make it really, really small in order to see the nifty scroll bars!",iGc='This is the east component',gGc='This is the first north component',hGc='This is the first south component',kGc='This is the second north component',lGc='This is the second south component',jGc='This is the west component',fGc='cw-DockPanel',pGc='cwDockPanel',vGc='east',xGc='lineend',wGc='linestart',sGc='north',eGc='runCallbacks19',tGc='south',uGc='west';_=w$.prototype=new x$;_.gC=I$;_.Hb=M$;_.tI=0;_=HIb.prototype=new eDb;_.gC=_Ib;_.Lb=aJb;_.$b=bJb;_.tI=220;_.b=null;var IIb,JIb,KIb,LIb,MIb,NIb,OIb;_=cJb.prototype=new Ql;_.gC=eJb;_.tI=0;_=fJb.prototype=new Ql;_.gC=jJb;_.tI=0;_.b=null;_.d=null;_=kJb.prototype=new Ql;_.gC=mJb;_.tI=221;_.b=0;_.c=null;var ZL=U1b(ppc,yGc),sR=U1b(urc,zGc),ZU=T1b(Vtc,AGc),tR=U1b(urc,BGc),qR=U1b(urc,CGc),rR=U1b(urc,DGc);J$();