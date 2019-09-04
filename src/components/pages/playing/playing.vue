<template>
	<div class="playing_box">
		<Header activeIndex="1"></Header>
		<div class="content_box">
			<div  v-show="isStart" class="starting">
				<div class="starting_title">
					<img src="../../../assets/images/playing/Identification_live@2x.png" width="40" height="20" alt="..." />
					<span>视频会议</span>
				</div>
				<div id="video-container" style="position:relative;margin: 0px auto;"></div>
			</div>
			
			<div v-show="!isStart" class="not_started">
				<div class="starting_title" style="text-indent: 40px;">
					视频会议
				</div>
				<div class="not_started_content">
					<img class="not_started_logo" src="../../../assets/images/playing/play_tip_noStart@2x.png" width="300" height="300" alt="...">
					<div class="not_started_bottom">
						<img src="../../../assets/images/playing/play_line@2x.png" width="480" height="50" alt="...">
						<span>博大经开建设会议直播</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/common/header/header'
	import Base from '@/base/base.vue'
	import {playConfig} from '@/axios/service/playing'
	export default Base.extend({
    data() {
        return {
			isStart: false, // 判断当前是否有视频会议
			width: 0,
            height: 0,
        }
	},
	 components: {
        Header
    },
    methods: {
        startPlay() {
			var that = this
			playConfig().then((res)=>{
				if(res.code == 0) {
					var result = res.data
					if(result.liveStatus == 1) {
						that.isStart = true
						var width, height;
						var options = {
							rtmp: result.rtmp,
							flv: result.flv,
							m3u8: result.m3u8,
							mp4: "",
							autoplay: true,
							live: true,
							// poster : "http://www.test.com/myimage.jpg",
							width: this.width,
							height: this.height,
							volume: 0.5,
							flash: true,
							flashUrl: "",
							x5_player: false,
							h5_flv: false,
							controls: 'default',
							wording: {
								2032: '请求视频失败，请检查网络',
								2048: '请求m3u8文件失败，可能是网络错误或者跨域问题'
							},
							listener: function(msg) {

							}
						};
						window.tcplayer = new TcPlayer('video-container', options);
						this.$nextTick(
							window.onresize = function() {
								var videoContainer = document.getElementById('video-container');
								var vcpPlayer = document.querySelector('.vcp-player');
								// var myVideo = document.querySelector('.vcp-video');
								var myVideo = document.getElementsByTagName('video')[0];
								console.log(11);
								if(vcpPlayer) {
									that.getWidth()
									videoContainer.style.width=`${that.width}px`;
									videoContainer.style.height=`${that.height}px`;

									vcpPlayer.style.position = `absolute`;
									vcpPlayer.style.left = '0';
									vcpPlayer.style.right = '0';
									vcpPlayer.style.width = `${that.width}px`;
									vcpPlayer.style.height = `${that.height}px`;
								}
								if(myVideo) {
									myVideo.style.position = `absolute`;
									myVideo.style.left = '0';
									myVideo.style.right = '0';
									myVideo.style.width = `${that.width}px`;
									myVideo.style.height = `${that.height}px`;
								}
							}
						)
						
					}else {
						that.isStart = false
					}
				}
            }).catch((err)=>{
                this.$message.error(err);
            });
			
		},
		// 获取宽高
        getWidth() {
            this.width = document.querySelector('.content_box').clientWidth;
            this.height = document.querySelector('.content_box').clientHeight - 61;
        }
    },
    mounted() {
		var that = this
        setTimeout(() => {
            this.getWidth()
        }, 0)
        // this.$nextTick(
        //     window.onresize = function() {
        //         var vcpPlayer = document.querySelector('.vcp-player')
		// 		var myVideo = document.getElementsByTagName('video')[0]
				
        //         if(vcpPlayer) {
        //             that.getWidth()
        //             vcpPlayer.style=`width:${that.width}px;height:${that.height}px;`
        //             myVideo.style=`width:${that.width}px;height:${that.height}px;`
        //         }
        //     }
        // )
    	this.startPlay()
	},
	beforeDestroy() {
		var vcpPlayer = document.querySelector('.vcp-player')
		if(vcpPlayer) {
			window.tcplayer.destroy()
		}
	}
})
</script>

<style lang="less" scoped>
    .playing_box {
        width: 100vw;
		height: 100vh;
		font-family:PingFangSC-Regular;
        background: #F5F7FA;
		.content_box {
            box-sizing: border-box;
            width: calc(100vw - 120px);
            height: calc(100vh - 160px);
            margin: 30px 60px 60px 60px;
            border-radius: 8px 8px 0px 0px;
            overflow: hidden;
			background: #fff;
			.starting_title {
				height: 60px;
                line-height: 60px;
				border-bottom: 1px solid #EDEFF2;
				background: #535B6E;
				color: #F5F7FA;
				img {
					margin-left: 40px;
					vertical-align: middle;
				}
				span {
					vertical-align: middle;
				}
			}
			.not_started {
				.not_started_content {
					position: relative;
					width: calc(100vw - 120px);
					height: calc(100vh - 221px);
					background: #282B36;
					.not_started_logo {
						display: block;
						position: absolute;
						top: -88px;
						right: 0;
						left: 0;
						bottom: 0;
						margin: auto;
					} 
					.not_started_bottom {
						position: absolute;
						bottom: 40px;
						right: 49px;
						height: 50px;
						line-height: 50px;
						text-align: right;
						img {
							vertical-align: middle;
						} 
						span {
							margin-right: 49px;
							font-size: 14px;
							color: #ADC6E7;
							vertical-align: bottom;
						}
					} 
				} 
			} 
		}
		
    }
    #video-container /deep/ .vcp-playtoggle {
    	display: none;
    }
</style>