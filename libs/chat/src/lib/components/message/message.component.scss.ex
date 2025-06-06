:host {
  .bar-footer {
    overflow: visible !important;
  }

  .bar-footer textarea {
    resize: none;
    height: 25px;
  }

  /* fixes an ios bug bear */
  button.ion-android-send {
    padding-top: 2px;
  }

  .footer-btn {
    font-size: x-large;
  }

  ion-img.profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    bottom: 10px;
  }

  ion-img.profile-pic.left {
    left: 10px;
  }

  ion-img.profile-pic.right {
    right: 10px;
  }

  .ion-email {
    float: right;
    font-size: 32px;
    vertical-align: middle;
  }

  .message {
    font-size: 14px;
  }

  .message-detail {
    white-space: nowrap;
    font-size: 14px;
  }

  .bar.item-input-inset .item-input-wrapper input {
    width: 100% !important;
  }

  .message-wrapper {
    position: relative;
  }

  .message-wrapper:last-child {
    margin-bottom: 10px;
  }

  .chat-bubble {
    border-radius: 5px;
    display: inline-block;
    padding: 10px 18px;
    position: relative;
    margin: 10px;
    max-width: 80%;
  }

  .chat-bubble:before {
    content: "\00a0";
    display: block;
    height: 16px;
    width: 9px;
    position: absolute;
    bottom: -7.5px;
  }

  .chat-bubble.left {
    background-color: var(--ion-color-secondary);
    float: left;
    margin-left: 55px;
  }

  .chat-bubble.left:before {
    background-color: var(--ion-color-secondary);
    left: 10px;
    -webkit-transform: rotate(70deg) skew(5deg);
  }

  .chat-bubble.right {
    background-color: var(--ion-color-primary);
    color: #fff;
    float: right;
    margin-right: 55px;
  }

  .chat-bubble.right:before {
    background-color: var(--ion-color-primary);
    right: 10px;
    -webkit-transform: rotate(118deg) skew(-5deg);
  }

  .chat-bubble.right a.autolinker {
    color: #fff;
    font-weight: bold;
  }

  .user-messages-top-icon {
    font-size: 28px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -3px;
    right: 5px;
  }

  .msg-header-username {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -3px;
  }

  input,
  textarea,
  .item-input,
  .item-input-wrapper {
    background-color: #f4f4f4 !important;
  }

  .bold {
    font-weight: bold;
  }

  .cf {
    clear: both !important;
  }

  a.autolinker {
    color: #3b88c3;
    text-decoration: none;
  }

  /* loading */
  .loader-center {
    height: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-direction: normal;
    -moz-box-direction: normal;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    -webkit-box-align: center;
    -moz-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .loader .ion-loading-c {
    font-size: 64px;
  }
}