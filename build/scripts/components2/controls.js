define(["lib/react","lib/clib","components2/payout","components2/countdown"],function(e,t,n,r){function s(e){return e<=100?"bit":"bits"}var i=e.DOM;return e.createClass({displayName:"Controls",propTypes:{engine:e.PropTypes.object.isRequired},getInitialState:function(){return{bet_size:"1",cash_out:"2.00",auto_play:!1}},invalidBet:function(){var e=this;if(e.props.engine.balanceSatoshis<100)return"Not enough bits to play";var t=parseFloat(e.state.bet_size);if(Number.isNaN(t)||t<1||Math.floor(t)!==t)return"The bet should be an integer greater than or equal to one";if(t>1e5)return"The bet must be less no more than 100,000 bits";var n=e.state.cash_out;return/^\d+(\.\d{1,2})?$/.test(n)?(n=parseFloat(n),console.assert(!Number.isNaN(n)),Number.isNaN(t)||n<1||Math.floor(t)!==t?"The bet should be an integer greater than or equal to one":e.props.engine.balanceSatoshis<t*100?"Not enough bits":null):"Invalid auto cash out amount"},placeBet:function(){var e=parseFloat(this.state.bet_size);console.assert(Number.isFinite(e)),e=Math.round(e*100);var t=parseFloat(this.state.cash_out);console.assert(Number.isFinite(t)),t=Math.round(t*100),console.assert(Number.isFinite(t)),this.props.engine.bet(e,t,this.state.auto_play,function(e){e&&console.error("Got betting error: ",e)})},cashOut:function(){this.props.engine.cashOut(function(e){e&&console.warn("Got cash out error: ",e)})},cancelPlaceBet:function(){throw new Error("todo cancel place bet!")},getStatusMessage:function(){if(this.props.engine.gameState==="STARTING")return console.log("showing starting..."),r({engine:this.props.engine});if(this.props.engine.gameState==="IN_PROGRESS")return this.props.engine.userState==="PLAYING"?i.span(null,"Currently playing..."):this.props.engine.lastGameWonAmount?i.span(null,"Cashed Out @  ",i.b({className:"green"},this.props.engine.lastGameWonAmount/this.props.engine.lastBet,"x")," / Won: ",i.b({className:"green"},t.formatSatoshis(this.props.engine.lastGameWonAmount))," ",s(this.props.engine.lastGameWonAmount)):i.span(null,"Game in progress..");if(this.props.engine.gameState==="ENDED"){console.log("sm: ended");if(this.props.engine.lastBet&&this.props.engine.lastGameWonAmount){console.log("sm: bet and won");var e;return this.props.engine.lastBonus&&(e=i.span(null,i.br()," (+",t.formatSatoshis(this.props.engine.lastBonus)," ",s(this.props.engine.lastBonus)," bonus)")),i.span(null,"Cashed Out @ ",i.b({className:"green"},this.props.engine.lastGameWonAmount/this.props.engine.lastBet,"x")," / Won: ",i.b({className:"green"},t.formatSatoshis(this.props.engine.lastGameWonAmount))," ",s(this.props.engine.lastGameWonAmount),e)}if(this.props.engine.lastBet){console.log("sm: bet and lost");var e;return this.props.engine.lastBonus&&(e=i.span(null,i.br(),"..but got a ",t.formatSatoshis(this.props.engine.lastBonus)," ",s(this.props.engine.lastBonus)," bonus")),i.span(null,"Game crashed @ ",i.b({className:"red"},this.props.engine.lastGameCrashedAt/100,"x")," / You lost ",i.b({className:"red"},this.props.engine.lastBet/100)," ",s(this.props.engine.lastBet),e)}return i.span(null,"Game crashed @ ",i.b({className:"red"},this.props.engine.lastGameCrashedAt/100,"x"))}},getBetter:function(){var e=this,t=e.invalidBet(),n;t?n=i.a({className:"big-button-disable unclick unselect"},"Place Bet!"):n=i.a({className:"big-button unselect",onClick:e.placeBet},"Place Bet!");var r=i.div(null,i.div({className:"auto-cash-out-span"},"Auto Cash Out @ "),i.input({min:1.1,value:e.state.cash_out,type:"number",name:"cash_out",onChange:function(t){e.setState({cash_out:t.target.value})}}),i.span({className:"sticky"},"x"));return i.div(null,i.div({className:"col-6-12"},i.div({className:"left-side unselect"},i.span({className:"bet-span strong"},"Bet"),i.input({type:"number",name:"bet-size",min:1,value:e.state.bet_size,onChange:function(t){e.setState({bet_size:t.target.value})}}),i.span({className:"sticky"},"Bits"))),i.div({className:"col-6-12 place-bet"},n,t?i.div({className:"invalid cancel"},t):null),r)},getBetting:function(){var e=this.props.engine.nextBetAmount,n=this.props.engine.nextAutoCashout,r=" with auto cash-out at "+n/100+"x";return i.div({className:"cash-out"},i.a({className:"big-button-disable unclick"},"Betting "+t.formatSatoshis(e)+" "+s(e),r),i.div({className:"cancel"},"Sending bet..."))},getCashOut:function(){return i.div({className:"cash-out"},i.a({className:"big-button unclick",onClick:this.cashOut},"Cash out at ",n({engine:this.props.engine})," bits"))},getContents:function(){return console.log("next bet amount: ",this.props.engine.nextBetAmount),this.props.engine.gameState==="IN_PROGRESS"&&this.props.engine.userState==="PLAYING"?this.getCashOut():this.props.engine.nextBetAmount||this.props.engine.gameState==="STARTING"&&this.props.engine.userState==="PLAYING"?this.getBetting():this.getBetter()},toggleAutoPlay:function(){var e=this.state.auto_play;e&&this.props.engine.cancelAutoPlay(),this.setState({auto_play:!e})},render:function(){console.log(this.props.engine.gameState," -> ",this.props.engine.userState);var e=this;return this.props.engine.username?i.div({className:"grid grid-pad "},i.div({className:"controls"},i.h5({className:"information"},this.getStatusMessage()),this.getContents()),i.div({className:"game-hash"},"Hash: ",i.a({href:"/faq#fair",target:"blank"},this.props.engine.hash)),i.div({className:"auto-bet"},i.label(null,i.input({type:"checkbox",name:"autoplay",onChange:this.toggleAutoPlay,checked:this.state.autoPlay,disabled:this.invalidBet()}),"auto bet"))):i.div({className:"grid grid-pad"},i.div({className:"controls"},i.div({className:"login"},i.a({className:"big-button unselect",href:"/login"},"Login to play"),i.a({href:"/register",className:"register"},"or register "))))}})});