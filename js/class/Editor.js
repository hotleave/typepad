define(['Reg', 'ArticleType', 'Article'], function (Reg,ArticleType, Article){
   class Editor{
      constructor(title, content) {
         this.title = title || '';
         this.content = content || '';
         this.paragraph = Article.customize.value;
         this.symbolEn =  0;
         this.symbolZh =  0;

         const self = this;
         $('.editor').addEventListener('paste', function (e) {
            e.preventDefault();

            var clipboardData = e.clipboardData;
            if (!(clipboardData && clipboardData.items)) {//是否有粘贴内容
                return;
            }

            var pasteContent = e.clipboardData.getData('text/plain');
            self.parseContent(pasteContent)
        })
      }
      show(config){
         $('.editor').classList.remove('hidden');
         this.title = config.customizedTitle;
         this.content = config.customizedContent;
         this.paragraph = config.customizedParagraph;
         $('.editor-title').value = this.title;
         $('.editor-content').value = this.content;
         $('.editor-paragraph').value = this.paragraph;

         // 避免主页滚动
         let app = $('body');
         app.style.height = innerHeight + 'px';
         app.style.overflow = 'hidden';
         this.updateInfo();
      }
      done(engine){
         if (!this.content.trim()){
            let elContent = $('.editor-content');
            elContent.placeholder = '请输入内容';
            elContent.focus();
            return
         }
         if (!this.title.trim()){
            let elTitle = $('.editor-title');
            elTitle.placeholder = '请输入标题';
            elTitle.focus();
            return
         }
         engine.config.customizedContent = this.content;
         engine.config.customizedTitle = this.title;
         engine.config.customizedParagraph = this.paragraph; 
         engine.config.articleIdentifier = this.paragraph;
         engine.config.articleName = this.title
         engine.config.articleType = ArticleType.customize
         engine.config.article = this.content;
         engine.config.save();

         Article.customize.value = this.paragraph;
         engine.loadArticleOptions();
         engine.applyConfig();
         this.hide();
      }
      hide(){
         $('.editor').classList.add('hidden');
         // 放开主页滚动
         let app = $('body');
         app.style.height = 'auto';
         app.style.overflow = 'auto';
      }

      // CONVERT SYMBOLS
      toZH(){
         Reg.TOZH.all.forEach(item => {
            this.content = this.content.replace(item.reg, item.replacement)
         })
         this.setContent();
      }
      toEN(){
         Reg.TOEN.all.forEach(item => {
            this.content = this.content.replace(item.reg, item.replacement)
         });
         this.setContent();
      }

      // REMOVE SYMBOLS
      trimSpace(){
         this.content = this.content.replace(Reg.REMOVE.space[0].reg, Reg.REMOVE.space[0].replacement);
         this.setContent();
      }
      trimReturn(){
         this.content = this.content.replace(Reg.REMOVE.return[0].reg, Reg.REMOVE.return[0].replacement);
         this.setContent();
      }

      setContent(){
         $('.editor-content').value = this.content;
         this.updateInfo();
      }

      // 更新展示数据
      updateInfo(){
         let stringSymbolChinese = this.content.match(Reg.MATCH.symbolCn);
         let stringSymbolEnglish = this.content.match(Reg.MATCH.symbolEn);
/*         let countCharacterEnglish = this.content.match(MATCH.characterEn)
         let countSpace = this.content.match(MATCH.space)
         let countTab = this.content.match(MATCH.tab)
         let countQuot = this.content.match(MATCH.quot)
         let countComma = this.content.match(MATCH.comma)*/
         this.symbolEn = stringSymbolEnglish ? stringSymbolEnglish.length: 0;
         this.symbolZh = stringSymbolChinese ? stringSymbolChinese.length: 0;
         $('#countSymbolEn').innerText = this.symbolEn;
         $('#countSymbolZh').innerText = this.symbolZh;
         $('#countCharacter').innerText = this.content ? this.content.length: 0;
      }

      parseContent(content) {
         let lines = content.split('\r');
         let config = {};
         if (lines.length >= 3) {
            config.customizedTitle = lines[0]
            config.customizedContent = lines[1]
            config.customizedParagraph = lines.pop().replace(/-+第(\d+)段.*/, '$1')
         } else if (lines.length === 2) {
            config.customizedContent = lines[0]
            config.customizedParagraph = lines.pop().replace(/-+第(\d+)段.*/, '$1')
         } else {
            config.customizedContent = content
         }
         this.show(config);
      }

      changeTitle(sender){
         this.title = sender.value
      }
      changeContent(sender){
         this.content = sender.value;
         this.updateInfo();
      }
      changeParagraph(sender) {
         this.paragraph = sender.value;
      }
   }
   return Editor
})