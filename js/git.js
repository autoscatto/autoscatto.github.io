    jQuery.githubUser = function(username, callback) {
	  jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
    }

    jQuery.fn.loadRepositories = function(username) {
      var target = this;
      $.githubUser(username, function(data) {
        var repos = data.data;
        sortByName(repos);

        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function() {
          console.log(this);
  			if (this.name != ('autoscatto.github.io')) {
  				list.append('<div class="proj"><dt><a href="'+ (this.homepage?this.homepage:this.html_url) +
          '">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em> - '+this.description+
          ' </dt><dd><em>Size: '+(this.size<1000?(this.size+' kB'):(Math.round((this.size/1000)*100)/100+' MB'))+
          ' - Watchers: '+this.watchers+' - Forks: '+this.forks+' </em></dd></div>');
  		  }
        });
      });

      function sortByName(repos) {
        repos.sort(function(a,b) {
          return a.name - b.name;
        });
      }
    };
