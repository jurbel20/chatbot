(function($){$(document).ready(function(){function getCookie(name){var value="; "+document.cookie;var parts=value.split("; "+name+"=");if(parts.length==2)return parts.pop().split(";").shift()}
function setCookie(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/"}
function removeDuplications(notifications){$(notifications).each(function(i,el){if(($(el).hasClass('type_woocommerce')||$(el).hasClass('type_easydigitaldownloads'))&&$(el).hasClass('subtype_transaction')){var order_id=$(el).attr('data-order-id');if(typeof order_id!==typeof undefined&&order_id!==!1){if($(notifications).filter('.subtype_specific_transaction[data-order-id="'+order_id+'"]').length>0){$(el).remove()}}}})}
var settings=BOOST_public.settings;var boost_visibility_time=parseInt(settings['boost-visibility-time']);var approximate_time_between_boosts=parseInt(settings['approximate-time-between-boosts']);approximate_time_between_boosts=approximate_time_between_boosts<5?approximate_time_between_boosts++:approximate_time_between_boosts;var current_url=location.protocol+'//'+location.host+location.pathname;var page=0;var full_loaded=!1;var loading=!1;var notifications=[];var close_boosts_setting=parseInt(settings['close-boosts']);var closed_boosts=getCookie('STYXKEY_BOOSTS_CLOSED_BOOSTS');if(typeof closed_boosts==='undefined'||!closed_boosts||close_boosts_setting===0){$.post(BOOST_public_Ajax.ajaxurl,{action:'boost_notifications_part_load_ajax',page:page,current_url:current_url,nonce:BOOST_public.notifications_part_load_nonce},function(response){if('Error'!==response&&(response.success===!0||response.success==='true')){var notifications_part_html=response.data.notifications_part_html;var notifications_part=$(notifications_part_html).find('.boost-notification');var notification_part_count=notifications_part.length;if(notification_part_count>0){removeDuplications(notifications_part);$('body').append('<div id="boost-notifications-wrapper"></div>');$('#boost-notifications-wrapper').append(notifications_part);$.merge(notifications,notifications_part);startShowingNotifications()}else{page--;full_loaded=!0}}
loading=!1});function startShowingNotifications(){if(notifications.length>0){removeDuplications(notifications);var i=0;setTimeout(function show_notification(){var closed_boosts=getCookie('STYXKEY_BOOSTS_CLOSED_BOOSTS');if(closed_boosts&&close_boosts_setting===1){return}
$(notifications[i]).show("fast");setTimeout(function(){var closed_boosts=getCookie('STYXKEY_BOOSTS_CLOSED_BOOSTS');if(closed_boosts&&close_boosts_setting===1){return}
$(notifications[i]).hide("fast",function(){$(this).remove()});i++;if(notifications.length!==0&&((i+1)/notifications.length)>=0.8&&!loading&&!full_loaded){notificationsPartLoad()}
if(i<notifications.length){setTimeout(show_notification,(Math.floor(Math.random()*3)+approximate_time_between_boosts-1)*1000)}},boost_visibility_time*1000)},Math.floor((Math.random()*4)+2)*1000)}}
function notificationsPartLoad(){loading=!0;page++;$.post(BOOST_public_Ajax.ajaxurl,{action:'boost_notifications_part_load_ajax',page:page,current_url:current_url,nonce:BOOST_public.notifications_part_load_nonce},function(response){if('Error'!==response&&(response.success===!0||response.success==='true')){var notifications_part_html=response.data.notifications_part_html;var notifications_part=$(notifications_part_html).find('.boost-notification');var notification_part_count=notifications_part.length;if(notification_part_count>0){removeDuplications(notifications_part);$('#boost-notifications-wrapper').append(notifications_part);$.merge(notifications,notifications_part)}else{page--;full_loaded=!0}}
loading=!1})}}
$(document).off('click','.boost-notification.allow-to-close .boost-close-button').on('click','.boost-notification.allow-to-close .boost-close-button',function(){setCookie('STYXKEY_BOOSTS_CLOSED_BOOSTS',!0,1);notifications=[];$('#boost-notifications-wrapper').empty();$(this).closest('.boost-notification').hide("fast",function(){$(this).remove()})})})})(jQuery)