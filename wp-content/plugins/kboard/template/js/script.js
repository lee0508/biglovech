/**
 * @author http://www.cosmosfarm.com/
 */

/**
 * inViewport jQuery plugin by Roko C.B.
 * http://stackoverflow.com/a/26831113/383904 Returns a callback function with
 * an argument holding the current amount of px an element is visible in
 * viewport (The min returned value is 0 (element outside of viewport)
 */
(function($, win){
	$.fn.kboardViewport = function(cb){
		return this.each(function(i, el){
			function visPx(){
				var elH = $(el).outerHeight(), H = $(win).height(), r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
				return cb.call(el, Math.max(0, t > 0 ? Math.min(elH, H - t) : (b < H ? b : H)));
			}
			visPx();
			$(win).on("resize scroll", visPx);
		});
	};
}(jQuery, window));

var kboard_ajax_lock = false;

var mod = jQuery('input[name=mod]').val();
if(mod == 'editor' && kboard_current.use_tree_category == 'yes'){
	kboard_tree_category_parents();
}

function kboard_tree_category_search(index, value){
	var length = jQuery('.kboard-search-option-wrap').length;
	var tree_category_index = parseInt(index) +1;

	if(value){
		jQuery('input[name="kboard_search_option[tree_category_'+index+'][value]"]').val(value);
	}
	else{
		jQuery('input[name="kboard_search_option[tree_category_'+index+'][value]"]').val('');
	}
	
	for(var i=tree_category_index; i<=length; i++){
		jQuery('.kboard-search-option-wrap-'+i).remove();
	}
	jQuery('#kboard-tree-category-search-form-'+kboard_current.board_id).submit();
	
	return false;
}

function kboard_tree_category_parents(){
	if(kboard_current.use_tree_category){
		var tree_category = kboard_current.tree_category;
		var tree_category_name;
		var tree_category_index = 1;
		
		tree_category_name = 'kboard_option_tree_category_';
		
		jQuery('.kboard-tree-category-wrap').prepend('<select id="kboard-tree-category-'+tree_category_index+'" class="kboard-tree-category kboard-tree-category-'+tree_category_index+'"></select>');
		jQuery('#kboard-tree-category-'+tree_category_index).append('<option value="">카테고리 선택</option>');
		jQuery('#kboard-tree-category-'+tree_category_index).after('<input type="hidden" id="'+tree_category_name+tree_category_index+'" name="'+tree_category_name+tree_category_index+'" class="kboard-tree-category-hidden-'+tree_category_index+'">');
		
		jQuery('#kboard-tree-category-'+tree_category_index).change(function(){
			kboard_tree_category_children(this.value, tree_category_index, tree_category_name);
			jQuery('#kboard-tree-category-search-form-'+kboard_current.board_id).submit();
		});
		
		jQuery.each(tree_category, function(index, element){
			if(!element.parent_id){
				jQuery('#kboard-tree-category-'+tree_category_index).append('<option value="'+element.id+'">'+element.category_name+'</option>');
			}
		});

		kboard_tree_category_selected(tree_category_index, tree_category_name);
	}
}

function kboard_tree_category_children(category_id, tree_category_index, tree_category_name){
	var tree_category = kboard_current.tree_category;
	var length = jQuery('.kboard-tree-category').length;
	var check = 0;
	
	for(var i=tree_category_index+1; i<=length; i++){
		jQuery('.kboard-tree-category-'+i).remove();
		jQuery('.kboard-tree-category-hidden-'+i).remove();
	}
	
	jQuery.each(tree_category, function(index, element){
		if(jQuery('#kboard-tree-category-'+tree_category_index).val() == element.id){
			jQuery('#'+tree_category_name+tree_category_index).val(element.category_name);
		}
	});
	
	if(jQuery('#kboard-tree-category-'+tree_category_index).val()){
		jQuery.each(tree_category, function(index, element){
			if(category_id === element.parent_id){
				if(check==0){
					jQuery('#kboard-tree-category-'+tree_category_index).after('<select id="kboard-tree-category-'+(tree_category_index+1)+'" class="kboard-tree-category kboard-tree-category-'+(tree_category_index+1)+'"></select>');
					jQuery('#kboard-tree-category-'+(tree_category_index+1)).append('<option value="">카테고리 선택</option>');
					
					jQuery('#kboard-tree-category-'+(tree_category_index+1)).after('<input type="hidden" id="'+tree_category_name+(tree_category_index+1)+'" name="'+tree_category_name+(tree_category_index+1)+'" class="kboard-tree-category-hidden-'+(tree_category_index+1)+'">');
					
					jQuery('#kboard-tree-category-'+(tree_category_index+1)).change(function(){
						kboard_tree_category_children(this.value, (tree_category_index+1), tree_category_name);
						jQuery('#kboard-tree-category-search-form-'+kboard_current.board_id).submit();
					});
				}
				check++;
				jQuery('#kboard-tree-category-'+(tree_category_index+1)).append('<option value="'+element.id+'">'+element.category_name+'</option>');
			}
		});
		kboard_tree_category_selected(tree_category_index+1, tree_category_name);
	}
	else{
		for(var i=tree_category_index; i<=length; i++){
			jQuery('.kboard-tree-category-hidden-'+i).val('');
			jQuery('.kboard-tree-category-hidden-'+(i+1)).remove();
		}
	}
	
	if(jQuery('.kboard-tree-category-search').length){
		jQuery('input[name="kboard_search_option[tree_category_'+tree_category_index+'][value]"').val(jQuery('#'+tree_category_name+tree_category_index).val());
		jQuery('input[name="kboard_search_option[tree_category_'+tree_category_index+'][key]"').val('tree_category_'+tree_category_index);
	}
}

function kboard_tree_category_selected(tree_category_index, tree_category_name){
	var check = jQuery('#tree-category-check-'+tree_category_index).val();
	
	if(check){
		jQuery('#kboard-tree-category-'+tree_category_index+' option').each(function(index, element){
			if(jQuery(element).text() == check){
				jQuery(element).attr('selected', 'selected');
				kboard_tree_category_children(this.value, tree_category_index, tree_category_name);
			}
		});
	}
	return false;
}

function kboard_editor_open_media(){
	var w = 900;
	var h = 500;
	
	if(kboard_current.board_id){
		if(jQuery('#kboard_media_wrapper').length){
			jQuery('#kboard_media_wrapper').show();
			jQuery('#kboard_media_wrapper').html(jQuery('<iframe frameborder="0"></iframe>').attr('src', kboard_settings.home_url+'?action=kboard_media&board_id='+kboard_current.board_id+'&media_group='+kboard_settings.media_group+'&content_uid='+kboard_current.content_uid));
			jQuery('#kboard_media_background').show();
		}
		else{
			var wrapper = jQuery('<div id="kboard_media_wrapper"></div>');
			var background = jQuery('<div id="kboard_media_background"></div>').css({opacity:'0.5'}).click(function(){
				kboard_media_close();
			});
			
			function init_window_size(){
				if(window.innerWidth <= 900){
					wrapper.css({left:0, top:0, margin:'10px', width:(window.innerWidth-20), height:(window.innerHeight-20)});
				}
				else{
					wrapper.css({left:'50%', top:'50%', margin:0, 'margin-left':(w/2)*-1, 'margin-top':(h/2)*-1, width:w, height:h});
				}
			}
			init_window_size();
			jQuery(window).resize(init_window_size);
			
			wrapper.html(jQuery('<iframe frameborder="0"></iframe>').attr('src', kboard_settings.home_url+'?action=kboard_media&board_id='+kboard_current.board_id+'&media_group='+kboard_settings.media_group+'&content_uid='+kboard_current.content_uid));
			jQuery('body').append(background);
			jQuery('body').append(wrapper);
			
			if(!jQuery('input[name="media_group"]').filter(function(){return this.value==kboard_settings.media_group}).length){
				jQuery('[name="board_id"]').parents('form').append(jQuery('<input type="hidden" name="media_group">').val(kboard_settings.media_group));
			}
		}
	}
}

function kboard_editor_insert_media(url){
	if(typeof tinyMCE != 'undefined'){
		if(typeof tinyMCE.activeEditor != 'undefined'){
			tinyMCE.activeEditor.execCommand('mceInsertRawHTML', false, "<img id=\"last_kboard_media_content\" src=\""+url+"\" alt=\"\">");
			tinyMCE.activeEditor.focus();
			tinyMCE.activeEditor.selection.select(tinyMCE.activeEditor.dom.select('#last_kboard_media_content')[0], true);
			tinyMCE.activeEditor.selection.collapse(false);
			tinyMCE.activeEditor.dom.setAttrib('last_kboard_media_content', 'id', '');
		}
	}
	else if(jQuery('#kboard_content').length){
		jQuery('#kboard_content').val(function(index, value){
			return value + (!value?'':' ') + "<img src=\""+url+"\" alt=\"\">";
		});
	}
}

function kboard_media_close(){
	jQuery('#kboard_media_wrapper').hide();
	jQuery('#kboard_media_background').hide();
}

function kboard_document_print(url){
	window.open(url, 'kboard_document_print');
	return false;
}

function kboard_document_like(button, callback){
	if(!kboard_ajax_lock){
		kboard_ajax_lock = true;
		jQuery.post(kboard_settings.ajax_url, {'action':'kboard_document_like', 'document_uid':jQuery(button).data('uid'), 'security':kboard_settings.ajax_security}, function(res){
			kboard_ajax_lock = false;
			if(typeof callback === 'function'){
				callback(res);
			}
			else{
				if(res.result == 'error'){
					alert(res.message);
				}
				else{
					jQuery('.kboard-document-like-count', button).text(res.data.like);
				}
			}
		});
	}
	else{
		alert(kboard_localize_strings.please_wait);
	}
	return false;
}

function kboard_document_unlike(button, callback){
	if(!kboard_ajax_lock){
		kboard_ajax_lock = true;
		jQuery.post(kboard_settings.ajax_url, {'action':'kboard_document_unlike', 'document_uid':jQuery(button).data('uid'), 'security':kboard_settings.ajax_security}, function(res){
			kboard_ajax_lock = false;
			if(typeof callback === 'function'){
				callback(res);
			}
			else{
				if(res.result == 'error'){
					alert(res.message);
				}
				else{
					jQuery('.kboard-document-unlike-count', button).text(res.data.unlike);
				}
			}
		});
	}
	else{
		alert(kboard_localize_strings.please_wait);
	}
	return false;
}

function kboard_comment_like(button, callback){
	if(!kboard_ajax_lock){
		kboard_ajax_lock = true;
		jQuery.post(kboard_settings.ajax_url, {'action':'kboard_comment_like', 'comment_uid':jQuery(button).data('uid'), 'security':kboard_settings.ajax_security}, function(res){
			kboard_ajax_lock = false;
			if(typeof callback === 'function'){
				callback(res);
			}
			else{
				if(res.result == 'error'){
					alert(res.message);
				}
				else{
					jQuery('.kboard-comment-like-count', button).text(res.data.like);
				}
			}
		});
	}
	else{
		alert(kboard_localize_strings.please_wait);
	}
	return false;
}

function kboard_comment_unlike(button, callback){
	if(!kboard_ajax_lock){
		kboard_ajax_lock = true;
		jQuery.post(kboard_settings.ajax_url, {'action':'kboard_comment_unlike', 'comment_uid':jQuery(button).data('uid'), 'security':kboard_settings.ajax_security}, function(res){
			kboard_ajax_lock = false;
			if(typeof callback === 'function'){
				callback(res);
			}
			else{
				if(res.result == 'error'){
					alert(res.message);
				}
				else{
					jQuery('.kboard-comment-unlike-count', button).text(res.data.unlike);
				}
			}
		});
	}
	else{
		alert(kboard_localize_strings.please_wait);
	}
	return false;
}

function kboard_content_update(content_uid, data, callback){
	if(!kboard_ajax_lock){
		kboard_ajax_lock = true;
		jQuery.post(kboard_settings.ajax_url, {'action':'kboard_content_update', 'content_uid':content_uid, 'data':data, 'security':kboard_settings.ajax_security}, function(res){
			kboard_ajax_lock = false;
			if(typeof callback === 'function'){
				callback(res);
			}
		});
	}
	else{
		alert(kboard_localize_strings.please_wait);
	}
	return false;
}

function kboard_ajax_builder(args, callback){
	if(!kboard_ajax_lock){
		kboard_ajax_lock = true;
		var callback2 = (typeof callback === 'function') ? callback : args['callback'];
		args['action'] = 'kboard_ajax_builder';
		args['callback'] = '';
		args['security'] = kboard_settings.ajax_security;
		jQuery.get(kboard_settings.ajax_url, args, function(res){
			kboard_ajax_lock = false;
			if(typeof callback2 === 'function'){
				callback2(res);
			}
		});
	}
	else{
		alert(kboard_localize_strings.please_wait);
	}
	return false;
}