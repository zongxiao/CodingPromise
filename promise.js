// 定义Promise构造函数
function Promise(executor) {
  // 定义对象状态值、结果值
  this.PromiseState = "pending";
  this.PromiseResult = null;

  // 获取实例的this并保存进instanceThis
  const instanceThis = this;

  // 定义存放只有一个实例调用then后所保存下来的回调函数【实际不使用】
  this.callback = {};

  // 定义存放只有一个实例调用then后所保存下来的回调函数【使用】
  this.callbacks = [];

  // resolve函数
  function resolve(value) {
    // 对象状态只能从'pending'改成'fulfilled'或者'rejected'
    if (instanceThis.PromiseState !== 'pending') return ;
    // 修改对象状态（也就是修改PromiseState属性值）、设置对象结果值（也就是设置PromiseResult属性值）
    instanceThis.PromiseState = "fulfilled";
    instanceThis.PromiseResult = value;
    // 执行then里面状态从pending变为fulfilled时的函数
    instanceThis.callbacks.forEach(item => {
      item.onResolve(value);
    })
  }

  // reject函数
  function reject(errorValue) {
    if (instanceThis.PromiseState !== 'pending') return ;
    instanceThis.PromiseState = "rejected";
    instanceThis.PromiseResult = errorValue;
    // 循环遍历执行then里面状态从pending变为rejected时的函数
    instanceThis.callbacks.forEach(item => {
      item.onReject(errorValue);
    });
  }

  // 处理throw抛出异常
  try {
    // 同步调用 执行器函数
    executor(resolve, reject);
  } catch (error) {
    // 捕获到抛出异常，需要将对象状态值设置为rejected
    reject(error);
  }

}

// 添加then方法
Promise.prototype.then = function(onResolve, onReject) {
  // 这里面的this指向的就是调用then函数的实例

  // 如果此时状态为fulfilled，执行then里面成功的回调函数
  if (this.PromiseState === 'fulfilled') {
    onResolve(this.PromiseResult);
  }
  // 如果此时状态为rejected，执行then里面失败的回调函数
  if (this.PromiseState === 'rejected') {
    onReject(this.PromiseResult);
  }
  // 如果此时状态为pending，先保存回调函数onResolve、onReject，等待状态改变时在【// resolve函数或者// reject函数】里面执行
  if (this.PromiseState === 'pending') {

    // 单一调用then，可以将回调函数存入对象，但是原生Promise是支持多次调用then，所以这里不能像下方注释这样写
    // this.callback = {
    //   onResolve,
    //   onReject
    // }

    // 为了防止后面的代码覆盖掉前面保存的回调函数需要利用到数组，
    this.callbacks.push({
      onResolve,
      onReject
    })
  }
}