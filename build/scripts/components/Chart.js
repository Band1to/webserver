define(["lib/react","lib/clib","components/Graph","stores/EngineVirtualStore"],function(e,t,n,r){function s(){return{engine:r.getState()}}var i=e.DOM;return e.createClass({displayName:"Chart",getInitialState:function(){return s()},_onChange:function(){this.setState(s())},componentWillMount:function(){var e;window.onresize=function(){window.innerWidth>767?window.innerWidth<1e3?e=Math.floor(window.innerWidth*.58):e=600:e=window.innerWidth*.9,self.graph=new n(e,300)},window.innerWidth>767?window.innerWidth<1e3?e=Math.floor(window.innerWidth*.58):e=600:e=window.innerWidth*.9,this.graph=new n(e,300)},componentWillUnmount:function(){r.removeChangeListener(this._onChange),this.mounted=!1},componentDidMount:function(){r.addChangeListener(this._onChange),this.mounted=!0,this.animRequest=window.requestAnimationFrame(this._draw)},_draw:function(){if(this.mounted){var e=this.getDOMNode();if(!e.getContext){console.log("No canvas");return}var t=e.getContext("2d");this.graph.setData(t,e,this.state.engine),this.graph.calculatePlotValues(),this.graph.clean(),this.graph.drawGraph(),this.graph.drawAxes(),this.graph.drawGameData(),this.animRequest=window.requestAnimationFrame(this._draw)}},render:function(){return i.canvas({width:this.graph.canvasWidth,height:this.graph.canvasHeight})}})});