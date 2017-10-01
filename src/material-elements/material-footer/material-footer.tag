<material-footer>
  <content select=".material-footer-sections"></content>
  <div class="mini-footer">
    <content select=".material-footer-logo"></content>
    <content select=".material-footer-link-list"></content>
  </div>
  <yield></yeild>
  <script type="es6">
      this.mixin('content');
  </script>
</material-footer>